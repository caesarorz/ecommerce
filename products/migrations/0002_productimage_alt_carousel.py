# Generated by Django 2.2.3 on 2019-08-09 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='productimage',
            name='alt_carousel',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]
