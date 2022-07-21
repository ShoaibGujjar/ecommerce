from django.http import JsonResponse
from rest_framework.decorators import api_view, APIView, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import filters
from django.contrib.auth.models import User
from user.models import Product, Type, ProductType, WishList, Review
from user.serializer import ProductSerializer, CategorySerializer, TypeSerializer, WishlistSerializer, update_wishlist_Serializer
from rest_framework import status
from rest_framework import viewsets


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    products = Product.objects.get(_id=pk)
    if products.countInStock > 4:
        products.countInStock = 4
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getType(request):
    products = Type.objects.all()
    serializer = TypeSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCategory(request):
    products = Product.objects.all()
    serializer = CategorySerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTypeProduct(request):
    products = Product.objects.all()
    collection = request.query_params.get('collection')
    type = request.query_params.get('type')
    user_id = request.query_params.get('user')
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    if not collection:
        collection = 'M'
    if type == 'all':
        type = None
    if type is not None:
        product_ids = ProductType.objects.filter(
            type__name=type).values_list('category')
        queryset = products.filter(
            collection=collection, _id__in=product_ids, name__icontains=query)
    if type is None:
        queryset = products.filter(
            collection=collection, name__icontains=query)

    serializer = ProductSerializer(
        queryset, many=True, context={'user_id': user_id, })
    return Response(serializer.data)


@api_view(['GET'])
def getWishlist(request):
    user_id = request.query_params.get('user')
    user = User.objects.get(id=user_id)
    wishlist_products_qs = user.wish_list.all()
    products = Product.objects.filter(
        _id__in=[p.product._id for p in wishlist_products_qs])
    serializer = WishlistSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_to_wishlist(request):
    #   print(data=request.data)
    data = request.data
    username = data['user'],
    product = data['product'],
    all_entries = WishList.objects.filter(user=username, product=product)
    print(all_entries)
    if not all_entries:
        print("shaoib")
        serializer = update_wishlist_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    message = "Already Exist"
    return Response(message)


@api_view(['GET'])
def del_Wishlist(request):
    user = request.query_params.get('user')
    product = request.query_params.get('product')
    WishList.objects.filter(user=user, product=product).delete()
    message = "product deleted successfully"
    return Response(message)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    print(data)
    print('shoaib')
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    elif data['rating'] == 0:
        content = {'detail': 'please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['commemt'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total/len(reviews)
        product.save()

        return Response('Review Added')


#  user_id = request.query_params.get('user')
#     user = User.objects.get(id=user_id)
#     wishlist_products_qs = user.wish_list.all()
#     products = Product.objects.filter(_id__in=[p.product._id for p in wishlist_products_qs])

    # if WishList.objects.filter(user=username,product=product):


# @api_view(['GET'])
# def getTypeProduct(request):
#     products=Product.objects.all()
#     collection=request.query_params.get('collection')
#     type=request.query_params.get('type')
#     print(collection)
#     if collection is not None:
#         product_ids = ProductType.objects.filter(type__name = type).values_list('category')
#         queryset = products.filter(collection=collection, _id__in = product_ids)
#     serializer=ProductSerializer(queryset,many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def getTypeProduct(request):
#     products=Product.objects.all()
#     serializer_class = ProductSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['name']
#     print(search_fields)
#     serializer=ProductSerializer(search_fields,many=True)
#     return Response(serializer.data)
