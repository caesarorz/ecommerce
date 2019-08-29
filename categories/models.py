import random
import os
from django.db import models
from django.urls import reverse
# Create your models here.
from django.db.models.signals import pre_save, post_save
from ecommerce.utils import unique_slug_generator, get_filename

def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image_path(instance, filename):
    new_filename = random.randint(1, 3966666)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(
        new_filename=new_filename, ext=ext)
    return "categories/{new_filename}/{final_filename}".format(
        new_filename=new_filename,
        final_filename=final_filename
    )

class CategoryQuerySet(models.query.QuerySet):
    """
    active means that is being supported (vigente) and updated
    featured means is still in stock (ofrecido)
    """
    def active(self):
        return self.filter(active=True)

    def featured(self):
        return self.filter(featured=True, active=True)

class CategoryManager(models.Manager):
    def get_queryset(self):
        return CategoryQuerySet(self.model, using=self._db)

    def all(self):
        return self.get_queryset().active()

    def featured(self):
        return self.get_queryset().featured()
        # return self.get_queryset().featured()

    def get_by_id(self, id):
        qs = self.get_queryset().filter(id=id)
        if qs.count() == 1:
            return qs.first()
        return None

class CategoryProducts(models.Model):
    title           = models.CharField(max_length=300)
    slug            = models.SlugField(blank=True, unique=True)
    image           = models.ImageField(upload_to=upload_image_path,null=True,blank=True)
    description     = models.TextField(blank=True)
    featured        = models.BooleanField(default=False)
    active          = models.BooleanField(default=True)
    pub_date        = models.DateTimeField(auto_now_add=True)
    active_html     = models.BooleanField(default=False)

    objects = CategoryManager()

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("categories:category_detail", kwargs={"slug": self.slug})

def categoryproducts_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)

pre_save.connect(categoryproducts_pre_save_receiver, sender=CategoryProducts)