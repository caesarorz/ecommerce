from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from user.serializers import UserSerializer
from .models import Order, OrderItem, ShippingAddress



class ShippingAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemsSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    ordersItems = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_ordersItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemsSerializer(items, many=True)
        return serializer.data

    def get_shipping_address(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data