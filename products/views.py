import random
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin

from django.http import Http404, HttpResponse
from django.views.generic import ListView, DetailView, View
from django.shortcuts import render, get_object_or_404, redirect

# from .mixins import StaffRequiredMixin, LoginRequiredMixin
# from carts.models import Cart, CartItem
# from .models import Product, Variation#, ProductFile
# from .forms import VariationInventoryFormSet

from .models import Product, ProductImage

class ProductDetailSlugView(DetailView):
    qs_product = Product.objects.all()

    template_name = "products/detail.html"

    def get_context_data(self, *args, **kwargs):
        context = super(ProductDetailSlugView, self).get_context_data(*args, **kwargs)
        # print(context)
        # cart_obj, new_obj = Cart.objects.new_or_get(self.request)
        # context['cart'] = cart_obj
        # instance = self.get_object()
        # context['related'] = Product.objects.get_related(instance)
        return context

    def get_object(self, *args, **kwargs):
        request = self.request
        slug = self.kwargs.get('slug')
        # instance = get_object_or_404(Product, slug=slug, active=True) #Product.objects.get_by_id(pk)
        try:
            instance = Product.objects.get(slug=slug, active=True)
        except Product.DoesNotExist:
            raise Http404("Product Not found..")
        except Product.MultipleObjectsReturned:
            qs = Product.objects.filter(slug=slug, active=True)
            instance = qs.first()
        except:
            raise Http404("Ummmm")
        return instance