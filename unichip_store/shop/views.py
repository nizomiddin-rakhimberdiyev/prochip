from django.shortcuts import render
from django.http import JsonResponse
from .models import Product, ReadyBuild, Category

def index(request):
    products = [
        {'id': 1, 'name': 'Gaming PC RTX 4070', 'cat': 'pc', 'price': 1499, 'img': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=700&q=80'},
        {'id': 2, 'name': 'Gaming PC RTX 3060', 'cat': 'pc', 'price': 899, 'img': 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=700&q=80'},
        {'id': 3, 'name': 'RGB Mechanical Keyboard', 'cat': 'accessory', 'price': 89, 'img': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80'},
        {'id': 4, 'name': 'Gaming Mouse RGB', 'cat': 'accessory', 'price': 49, 'img': 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=80'},
        {'id': 5, 'name': 'Gaming Headset', 'cat': 'accessory', 'price': 79, 'img': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80'},
        {'id': 6, 'name': '27" Gaming Monitor', 'cat': 'accessory', 'price': 299, 'img': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80'},
        {'id': 7, 'name': 'RTX 4070 Ti', 'cat': 'pc', 'price': 999, 'img': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=700&q=80'},
        {'id': 8, 'name': '32GB RGB RAM', 'cat': 'accessory', 'price': 129, 'img': 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=700&q=80'}
    ]
    
    builds = [
        {'title': 'LITE BUILD', 'price': 629, 'cpu': 'Ryzen 5', 'ram': '16GB RAM', 'gpu': 'RTX 3060', 'ssd': '512GB SSD', 'featured': False},
        {'title': 'CORE BUILD', 'price': 799, 'cpu': 'Ryzen 5', 'ram': '32GB RAM', 'gpu': 'RX 6700XT', 'ssd': '1TB SSD', 'featured': False},
        {'title': 'PREMIUM BUILD', 'price': 1415, 'cpu': 'i5 / Ryzen 7', 'ram': '32GB RAM', 'gpu': 'RTX 4070Ti', 'ssd': '1TB SSD', 'featured': True},
        {'title': 'PRO BUILD', 'price': 2050, 'cpu': 'Ryzen 9', 'ram': '64GB RAM', 'gpu': 'RTX 4090', 'ssd': '2TB SSD', 'featured': False},
    ]
    
    context = {
        'products': products,
        'builds': builds
    }
    return render(request, 'shop/index.html', context)
