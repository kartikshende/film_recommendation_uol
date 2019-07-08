
from film_reviews.api.views import (
    MovieViewSet,
    MovieReViewListSet,
    UserRating,
    MovieReViewSet,
    LinksViewSet,
    LinksRandomViewSet,
    FavouriteMovieViewSet,
    FavouriteMovieListViewSet,
    GenresChoiceViewSet,
    MovieSuggetions_Itembased_KNNSet,
    Userbased_KNN_Set,
    MovieSuggetions_Itembased_MatrixFacto,
    ReviewFromMovieDBViewSet,
    ListReviewFromMovieDBViewset,
    FavouriteMovieDBViewSet
    
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'reviews', MovieReViewSet, basename='film_reviews')
router.register(r'reviewslist',  MovieReViewListSet , basename='film_reviews')

router.register(r'movie', MovieViewSet, basename='film_reviews')
router.register(r'links', LinksViewSet, basename='film_reviews')
router.register(r'linksrandom', LinksRandomViewSet, basename='film_reviews')

router.register(r'genreschoices', GenresChoiceViewSet, basename='film_reviews')
router.register(r'favouritemovie',  FavouriteMovieViewSet, basename='film_reviews')
router.register(r'favouritemovielist',  FavouriteMovieListViewSet, basename='film_reviews')
router.register(r'newfavouritemovielist',  FavouriteMovieDBViewSet, basename='film_reviews')

router.register(r'userrating',  UserRating , basename='film_reviews')

router.register(r'getmovie_itembased_knn', MovieSuggetions_Itembased_KNNSet, basename='film_reviews')
router.register(r'getmovie_userbased_knn', Userbased_KNN_Set, basename='film_reviews')

router.register(r'ReviewFromMovieDBViewSet', ReviewFromMovieDBViewSet, basename='film_reviews')
router.register(r'ListReviewFromMovieDBViewset', ListReviewFromMovieDBViewset, basename='film_reviews')

#router.register(r'getmovie_Itembased_MatrixFacto', MovieSuggetions_Itembased_MatrixFacto, basename='film_reviews')
urlpatterns = router.urls

# from django.contrib import admin
# from django.urls import path, include

# from .views import (
#     MovieListView, 
#     MovieDetailsView, 
#     ReviewCreateView,
#     ReviewUpdateView,
#     ReviewDeleteView
# )

# urlpatterns = [
#     path('', MovieListView.as_view()),
#     path('create/', ReviewCreateView.as_view()),
#     path('<pk>', MovieDetailsView.as_view()),
#     path('<pk>/update/', ReviewUpdateView.as_view()),
#     path('<pk>/delete/', ReviewDeleteView.as_view())
# ]
