from django.contrib import admin
from .models import(
 Movie,
 Review, 
 Links,
 GenresChoice,
 FavouriteMovies,
 ReviewFromMovieDB,
 FavouriteMoviesMovieDB  
) 
#GenresChoice
# Register your models here.


class ReviewAdmin(admin.ModelAdmin):
    model = Review
    list_display = ('movie', 'rating', 'user_name', 'comment', 'pub_date')
    list_filter = ['pub_date', 'user_name']
    search_fields = ['comment']


admin.site.register(Movie)
admin.site.register(Review)
admin.site.register(Links)
admin.site.register(GenresChoice)
admin.site.register(FavouriteMovies)
admin.site.register(ReviewFromMovieDB)
admin.site.register(FavouriteMoviesMovieDB)
