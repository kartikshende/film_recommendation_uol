from __future__ import unicode_literals

from django.db import models

from django.db.models import Avg
from django.contrib.auth.models import User


class Movie(models.Model):
    id = models.IntegerField(primary_key=True,auto_created=False)
    title = models.CharField(max_length=200)
    genres = models.CharField(max_length=200, blank=True, null=True)

    def average_rating(self):
        return self.review_set.aggregate(Avg('rating'))['rating__avg']

    def __str__(self):
        return self.title


class Review(models.Model):
    RATING_CHOICES = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    )
    movie = models.ForeignKey('movie', on_delete=models.DO_NOTHING)
    pub_date = models.DateTimeField('date published')
    user_id = models.ForeignKey(
        User, default=None, null=True, blank=True, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=100, default='user')
    comment = models.CharField(max_length=200)
    rating = models.FloatField(choices=RATING_CHOICES, default=None,
                               null=True, blank=True)


class Links(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.DO_NOTHING,related_name='links')
    imdb_id = models.IntegerField(default=None, null=True, blank=True)
    tmdb_id = models.IntegerField(default=None, null=True, blank=True)

class GenresChoice(models.Model):
    user_id = models.ForeignKey(
        User,default=None, on_delete=models.CASCADE)
    choices = models.CharField(max_length=200)
    
    
class FavouriteMovies(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE)
    movie = models.ForeignKey('movie', on_delete=models.DO_NOTHING)
    order = models.SmallIntegerField()
   

class ReviewFromMovieDB(models.Model):
    RATING_CHOICES = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    )
    movieid = models.IntegerField(default=None, null=False, blank=False)

    title = models.CharField(max_length=200)

    pub_date = models.DateTimeField('date published')
    user_id = models.ForeignKey(
        User, default=None, null=True, blank=True, on_delete=models.CASCADE)
    
    comment = models.CharField(max_length=200)
    rating = models.FloatField(choices=RATING_CHOICES, default=None,
                               null=True, blank=True)


class FavouriteMoviesMovieDB(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE)
    movieid= models.IntegerField(default=None, null=False, blank=False)
    title = models.CharField(max_length=200)
    