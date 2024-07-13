from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import User, Post, Follow
import json

from django.core.paginator import Paginator

def index(request):
    return render(request, "network/index.html")
@login_required
def following(request):
    return render(request, "network/following.html")

def check_authentication_status(request):
    if request.user.is_authenticated:
        return JsonResponse({'authenticated': True})
    else:
        return JsonResponse({'authenticated': False})

@login_required
def profile(request, username):
    return render(request, "network/profile.html", {
        "username": username
    })

@csrf_exempt
@login_required
def new_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        content = data.get('content', '')
        if content:
            post = Post(user=request.user, content=content)
            post.save()
            return JsonResponse({'message': 'Post created successfully.' }, status=201)
        return JsonResponse({'error': 'Content required.'}, status=400)
    else:
        return JsonResponse({'error': 'POST request required'}, status=400)

@csrf_exempt
def all_posts(request):
    if request.method == "GET":
        post_list = Post.objects.all().order_by('-timestamp')
        paginator = Paginator(post_list, 10)
        page_number = request.GET.get("page")
        total_pages = paginator.num_pages
        page_obj = paginator.get_page(page_number)


        serialize_data = {
            "total_pages":total_pages
        }

        serialize_data['posts'] = [ post.serialize() for post in page_obj ]


        return JsonResponse(serialize_data, safe=False)
    else:
        return JsonResponse({"error": "GET request required"}, status=400)

@csrf_exempt
def following_posts(request):
    if request.method == "GET":
        follows = request.user.following.all()

        post_list = []

        for follow in follows:
            posts = follow.followed.posts.all().order_by('-timestamp')
            for post in posts:

                post_list.append(post.serialize())



        paginator = Paginator(post_list, 10)
        page_number = request.GET.get("page")
        total_pages = paginator.num_pages


        page_obj = paginator.get_page(page_number)

        serialize_data = {
            "total_pages": total_pages 
        }

        serialize_data["posts"]= [ post for post in page_obj ]

        return JsonResponse(serialize_data,safe=False)
    else:
        return JsonResponse({"error": "GET request required"}, status=400)

@csrf_exempt
def like(request, post_id):
    if request.method == "POST":
        post = get_object_or_404(Post, id=post_id)

        if request.user in post.likes.all():
            post.likes.remove(request.user)
            return JsonResponse({"message": "Post disliked successfully"}, status=200)

        else:
            post.likes.add(request.user)
            return JsonResponse({"message": "Post liked successfully"}, status=201)




    else:
        return JsonResponse({"error": "POST request required"}, status=400)
    
@csrf_exempt
def follow(request, username):
    if request.method == "POST":
        user = get_object_or_404(User, username=username)
        following, created = Follow.objects.get_or_create(follower=request.user, followed=user)

        if created:
            return JsonResponse({"message": "Followed successfully"}, status=201)
        else:
            following.delete()
            return JsonResponse({"message": "Unfollowed successfully"}, status=200)

    else:
        return JsonResponse({"error": "GET request required"}, status=400)

@csrf_exempt
def edit(request, post_id):
    if request.method == "POST":
        post = get_object_or_404(Post, id=post_id)
        data = json.loads(request.body)
        content = data.get('content', '')

        if content:
            post.content = content
            post.save()
            return JsonResponse({"message": "Post edited successfully"}, status=200)
        else:
            return JsonResponse({"error": "Content required"}, status=400)
            

    else:
        return JsonResponse({"error": "POST request required"}, status=400)
    
@csrf_exempt
def get_profile(request, username):
    if request.method == "GET":
        user = get_object_or_404(User, username=username)

        profile_data = {
            "user": user.username,
            "bio": user.bio,
            "profile_picture": user.profile_picture.url,
            "posts": user.posts.count(),
            "followers": user.followers.count(),
            "following": user.following.count()
        }
        return JsonResponse(profile_data, safe=False)

    else:
        return JsonResponse({"error": "GET request required"}, status=400)

@csrf_exempt
def get_user_posts(request, username):
    if request.method == "POST":
        user = get_object_or_404(User, username=username)
        post_list = user.posts.all()

        paginator = Paginator(post_list, 10)
        page_number = request.GET.get("page")
        total_pages = paginator.num_pages

        page_obj = paginator.get_page(page_number)

        serialize_data = {
            "total_pages": total_pages 
        }
        serialize_data["posts"]= [ post.serialize() for post in page_obj ]


        return JsonResponse(serialize_data, safe=False)
    else:
        return JsonResponse({"error": "POST request required"}, status=400)

# Auth views
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
