from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.

STATUS = (
    (0,"Borrador"),
    (1,"finalizado")
)

class Projects(models.Model):
    title = models.CharField(max_length=300, unique=True)
    slug = models.SlugField(max_length=300, unique=True, default=None)
    desc = models.CharField(max_length=500)
    photo = models.ImageField(upload_to='photos/')
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    status = models.IntegerField(choices=STATUS, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title