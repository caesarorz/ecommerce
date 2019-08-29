from django.http import Http404, HttpResponse
from django.views.generic import ListView, DetailView, View
from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

import random

from products.models import Product
from .models import CategoryProducts
# Create your views here.

class CategoryListView(ListView):
    """
    List all categories in the main webpage
    """
    template_name = "categories/category_list.html"

    def get_context_data(self, *args, **kwargs):
        context = super(CategoryListView, self).get_context_data(*args, **kwargs)
        context['categories'] = self.get_queryset()
        return context

    def get_queryset(self, *args, **kwargs):
        request = self.request
        # return CategoryProducts.objects.all().active()
        return CategoryProducts.objects.all()


class CategoryDetailSlugView(DetailView):
    queryset = CategoryProducts.objects.all()
    template_name = "categories/category_detail.html"

    def get_context_data(self, *args, **kwargs):
        context = super(CategoryDetailSlugView, self).get_context_data(*args, **kwargs)
        instance = self.get_object()
        # products = Product.objects.filter(category__title=instance).active()
        products = Product.objects.filter(category__title=instance)
        categories = CategoryProducts.objects.all()
        # products = Product.objects.filter
        # cart_obj, new_obj = Cart.objects.new_or_get(self.request)
        context['categories'] = categories
        context['products'] = products
        return context

    def get_object(self, *args, **kwargs):
        # request = self.request
        slug = self.kwargs.get('slug')
        instance = get_object_or_404(CategoryProducts, slug=slug, active=True)
        # print(instance)
        if instance is None:
            raise Http404("Categoria no existe")
        return instance