from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from .models import Product, Review #Order, OrderItem, ShippingAddress,

class ReviewSerializer(serializers.ModelSerializer):

    # name = serializers.SlugRelatedField(
    #     read_only=True,
    #     slug_field='name'
    # )

    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    # name = serializers.SlugRelatedField(
    #     read_only=True,
    #     slug_field='name'
    # )

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
