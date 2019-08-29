from django.http import HttpResponse, Http404
from django.db.models import Count, Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.views.generic import CreateView, View

from products.models import Product


def home_page(request):
    products = Product.objects.all()
    context = {"products":products}
    return render(request, 'index.html', context)