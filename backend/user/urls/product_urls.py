from django.urls import URLPattern, path
from user.views import product_views as views

urlpatterns = [
    path('products/', views.getProducts, name="products"),
    path('product/<str:pk>/reviews/',
         views.createProductReview, name="create-review"),
    path('product/<str:pk>', views.getProduct, name="product"),
    path('type/', views.getType, name="Type"),
    path('category/', views.getCategory, name="Category"),
    path('typeproduct/', views.getTypeProduct, name="Query"),
    path('wishlist/', views.getWishlist, name="Wishlist"),
    path('addto_wishlist/', views.add_to_wishlist, name="Add_Wishlist"),
    path('del_wishlist/', views.del_Wishlist, name="del_Wishlist"),

]
