from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import ProductSerializer
from .models import Product, Review


# # TODO split
@api_view(['GET'])
def list_products(requests):
    """_summary_

    Args:
        requests (_type_): _description_

    Returns:
        _type_: _description_
    """
    query = requests.query_params.get('search')

    if query == None:
        query = ''

    products = Product.objects.all().filter(name__icontains=query)
    product_serialized = ProductSerializer(products, many=True)
    return Response(product_serialized.data)

# # TODO wire and connect
# @api_view(['GET'])
# def search_products(requests):
#     query = requests.query_params.get('keyword')
#     products = Product.objects.all()
#     product_serialized = ProductSerializer(products, many=True)
#     return Response(product_serialized.data)



@api_view(['GET'])
def get_product(requests, pk):
    """Get a product by id

    Args:
        requests (HttpRequest object): Http request object with data
        pk (int): Product's id

    Returns:
        Http Response Template: Response object containing product information, such as:
        name, description, id, reviews, etc.
    """
    product = Product.objects.get(id=pk)
    product_serialized = ProductSerializer(product, many=False)
    return Response(product_serialized.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_reviews(request, pk):
    """_summary_

    Args:
        request (_type_): _description_
        pk (_type_): _description_

    Returns:
        _type_: _description_
    """


    product = Product.objects.get(id=pk)
    user = request.user
    data = request.data
    #1 review already exists

    already_exists = product.review_set.filter(user=user).exists()
    if already_exists:
        content = {'detail': f'Product {product.name} already reviewed'} # add extension here: overwrite review
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2 no rating = 0
    elif int(data['rating']) <= 0:
         content = {'detail': f'Please select a rating'}
         return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 3 create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],)

        reviews = product.review_set.all()
        product.num_reviews = reviews.count()
        product.rating = sum([i.rating for i in reviews]) / product.num_reviews
        product.save()

        return Response('Review added')


from rest_framework.views import APIView
class ListProducts(APIView):
    """
    View to products
    """

    def get(self, request, format=None):
        """
        Return a list of all products.
        """
        products = Product.objects.all()
        product_serialized = ProductSerializer(products, many=True)
        return Response(product_serialized.data)



