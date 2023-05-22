
from django.urls import path

from . import views

urlpatterns = [
    path('orders/', views.get_orders, name='orders-user'),
    path('orders/add/', views.add_order_items, name='add-order'), # add/
    path('orders/<str:pk>/', views.get_order_by_id, name='get-order'),
    path('orders/<str:pk>/pay/', views.order_paid, name='order-pay'),
]