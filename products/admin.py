from django.contrib import admin

from products.models import Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0
    max_num = 3
    fields = ('title', 'image', 'active_html', 'data_slide_html', 'featured', 'alt_carousel')


class ProductAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'slug', 'timestamp']
    inlines = [ProductImageInline]

    class Meta:
        model = Product

admin.site.register(Product, ProductAdmin)
