from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    image_url = models.URLField()
    subtitle = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    CAT_CHOICES = (
        ('pc', 'Kompyuterlar'),
        ('accessory', 'Aksessuarlar'),
    )
    name = models.CharField(max_length=200)
    category_type = models.CharField(max_length=20, choices=CAT_CHOICES, default='pc')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - ${self.price}"

class ReadyBuild(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    cpu = models.CharField(max_length=100)
    ram = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100)
    ssd = models.CharField(max_length=100)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title
