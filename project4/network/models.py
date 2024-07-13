from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    profile_picture = models.ImageField( upload_to="profile_pictures", default='default_pfp.png')
    bio = models.TextField(default="No bio.")

    def __str__(self):
        return self.username


class Post(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    timestamp = models.DateTimeField( auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', null=True, blank=True)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "content": self.content,
            "likes": self.likes.count(),
            "timestamp": self.timestamp.strftime('%b %d %Y, %I:%M %p'),
        }
    
    def __str__(self):
        return f"{self.user.username} posted {self.content[:8] + '...' if len(self.content) > 7 else self.content}"

class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    timestamp = models.DateTimeField( auto_now_add=True)

    def __str__(self):
        return f"{self.follower.username} followed {self.followed.username}"