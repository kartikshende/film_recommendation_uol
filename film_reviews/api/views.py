import random
from rest_framework import viewsets

from rest_framework.generics import (
     ListAPIView, 
     RetrieveAPIView, 
     CreateAPIView,
     DestroyAPIView,
     UpdateAPIView
    )

from film_reviews.models import (
    Movie,
    Review, 
    Links,
    GenresChoice,
    FavouriteMovies,
    ReviewFromMovieDB,
    FavouriteMoviesMovieDB
)
from django.contrib.auth.models import User
from .serializers import (
    MoviesSerializer, 
    ReviewListSerializer, 
    ReviewSerializer,
    LinksSerializer,
    GenresChoicesSerializer,
    FavouriteMoviesSerializer,
    FavouriteMoviesListSerializer,
    ReviewFromMovieDBSerializer,
    ReviewFromMovieDBListSerializer,
    FavouriteMoviesDBSerializer
)
from rest_framework import permissions

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters import FilterSet,rest_framework as filters

import pandas as pd
import numpy as np
import scipy as sp
from sklearn.neighbors import NearestNeighbors

from scipy.sparse.linalg import svds
from sklearn.metrics.pairwise import cosine_similarity

from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)

""" ----------------------Review List fro MovieDB get request Set (latest 50 reviews)--------------------  """


class ReviewFromMovieDBViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewFromMovieDBSerializer
    queryset = ReviewFromMovieDB.objects.all() 
   # permission_classes = (permissions.IsAuthenticated, )

class ListReviewFromMovieDBViewset(viewsets.ModelViewSet):
    
    serializer_class = ReviewFromMovieDBListSerializer
    
    latest_review_list = ReviewFromMovieDB.objects.order_by('-pub_date') [:20]
    
    queryset = latest_review_list
   # permission_classes = (permissions.IsAuthenticated, )


""" ----------------------Review List get request Set (latest 50 reviews)--------------------  """

class MovieReViewListSet(viewsets.ModelViewSet):
    
    serializer_class = ReviewListSerializer
    
    latest_review_list = Review.objects.order_by('-pub_date') [:50]
    #review = get_object_or_404(Review, id=pk)
    
   
    queryset = latest_review_list
    permission_classes = (permissions.IsAuthenticated, )

""" ----------------------Review Post request Set--------------------  """

class MovieReViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all() 
   # permission_classes = (permissions.IsAuthenticated, )

""" ----------------------rating List get request Set--------------------  """

class UserRating(viewsets.ModelViewSet):
    serializer_class = ReviewListSerializer
    permission_classes = (permissions.IsAuthenticated, )
    #filter_backends = (DjangoFilterBackend,)
    def get_queryset(self):
        """
        This view should return a list of all the rated movies
        for the currently authenticated user.
        """
        user = self.request.user
        return Review.objects.filter(user_id=user).order_by('-pub_date')[:50]
        
""" ----------------------Movie List get and post Set--------------------  """

class MovieViewSet(viewsets.ModelViewSet):
    
    serializer_class = MoviesSerializer

    queryset = Movie.objects.all() #Movie.objects.order_by('?')[:20]
   # permission_classes = (permissions.IsAuthenticated, )
    filter_backends = (SearchFilter,)
    #filter_class = LinksFilter
    #filter_fields = ('movie__genres',)
    #ordering = ('movie__average_rating',)
    search_fields = ('title',)
""" ----------------------Movie Link Random movies List get request Set--------------------  """

class LinksRandomViewSet(viewsets.ModelViewSet):
    
    serializer_class = LinksSerializer

    queryset = Links.objects.order_by('?')[:20]

""" ----------------------Movie Link List get request Set--------------------  """

class LinksFilter(FilterSet):
    movie__genres = filters.CharFilter('movie__genres')
    min_rating = filters.CharFilter(method="filter_by_min_rating")

      # class Meta:
      #     model = Links
      #     fields = ('genres')

    def filter_by_min_rating(self,queryset,name,value):
        queryset = queryset.filter(movie__average_rating__gt=value)
        raise Exception
        return queryset



class LinksViewSet(viewsets.ModelViewSet):
    
    queryset = Links.objects.order_by('?')
    serializer_class = LinksSerializer

    #permission_classes = (permissions.IsAuthenticated, )
    
    filter_backends = (DjangoFilterBackend,SearchFilter,)
    filter_class = LinksFilter
    filter_fields = ('movie__genres',)
    #ordering = ('movie__average_rating',)
    search_fields = ('movie__genres',)


""" ----------------------Genres Choices List get and post Set--------------------  """

class GenresChoiceViewSet(viewsets.ModelViewSet):
    
    serializer_class = GenresChoicesSerializer

    queryset = GenresChoice.objects.all()
    permission_classes = (permissions.IsAuthenticated, )

    filter_backends = (DjangoFilterBackend,)
    #filter_fields = ('user__id')
    
    # def create(self,request):
    #     serializer = GenresChoicesSerializer(data=request.data)
    #     if serializer.is_valid():
    #         genreschoice = serializer.create(request)
    #         if genreschoice:
    #              return Response(status=HTTP_201_CREATED)
    #     return Response(status=HTTP_400_BAD_REQUEST)

    def create(self, request):
        print(request.data)
        serializer = GenresChoicesSerializer(data=request.data)
        serializer.is_valid()
        genreschoice = serializer.create(request)
        if genreschoice:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        """
        This view should return a list of all the rated movies
        for the currently authenticated user.
        """
        user = self.request.user
        return GenresChoice.objects.filter(user_id=user)

""" ----------------------Favourite movie List post request Set--------------------  """

class FavouriteMovieViewSet(viewsets.ModelViewSet):
    
    serializer_class = FavouriteMoviesSerializer
    queryset = FavouriteMovies.objects.all()
    permission_classes = (permissions.IsAuthenticated, )

    def Post(self, request):
        print(request.data)
        serializer = FavouriteMoviesSerializer(data=request.data)
        serializer.is_valid()
        fav = serializer.create(request)
        if fav:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

    

""" ----------------------Favourite movie List get request Set--------------------  """

class FavouriteMovieListViewSet(viewsets.ModelViewSet):
    
    serializer_class = FavouriteMoviesListSerializer
    #queryset = FavouriteMovies.objects.all()
    permission_classes = (permissions.IsAuthenticated, )
    filter_backends = (DjangoFilterBackend,)
    #filter_fields = ('user__id')
    def get_queryset(self):
        """
        This view should return a list of all the Favourite movies
        for the currently authenticated user.
        """
        user = self.request.user
        return FavouriteMovies.objects.filter(user_id=user)

""" ----------------------New Favourite movie MovieDB List post request Set--------------------  """

class FavouriteMovieDBViewSet(viewsets.ModelViewSet):
    
    serializer_class = FavouriteMoviesDBSerializer
    queryset = FavouriteMoviesMovieDB.objects.all()
    permission_classes = (permissions.IsAuthenticated, )
    
    def Post(self, request):
        print(request.data)
        serializer = FavouriteMoviesDBSerializer(data=request.data)
        serializer.is_valid()
        fav = serializer.create(request)
        if fav:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        """
        This view should return a list of all the Favourite movies
        for the currently authenticated user.
        """
        user = self.request.user
        return FavouriteMoviesMovieDB.objects.filter(user_id=user)




""" ----------------------MovieSuggetions_Itembased_KNNSet List get request Set--------------------  """

class MovieSuggetions_Itembased_KNNSet(viewsets.ModelViewSet):
    #serializer_class = ReviewSerializer
    serializer_class = FavouriteMoviesSerializer
    serializer_class = MoviesSerializer
   
    #serializer_class = LinksSerializer
    
    def get_queryset(self):
        user = self.request.user
        favmovie= FavouriteMovies.objects.filter(user_id=user).values_list('movie',flat=True).order_by('id')
        fav=random.choice(favmovie)
        print(fav)
        num_reviews = Review.objects.count()
        all_user_names = list(map(lambda x: x.id, User.objects.only("id")))
        all_movie_ids = set(map(lambda x: x.movie.id, Review.objects.only("movie")))
        num_users = len(list(all_user_names))
        movieRatings_m = sp.sparse.dok_matrix((num_users, max(all_movie_ids)+1),dtype=np.float32)#
        for i in range(num_users):
            user_reviews = Review.objects.filter(user_id = all_user_names[i])
            for user_review in user_reviews:
                movieRatings_m[i,user_review.movie.id] = user_review.rating 
        movieRatings = movieRatings_m.transpose()
        coo = movieRatings.tocoo(copy=False)
        df=pd.DataFrame({'movies': coo.row, 'users': coo.col, 'rating': coo.data})[['movies', 'users', 'rating']].sort_values(['movies','users']).reset_index(drop=True)

        mo=df.pivot_table(index=['movies'],columns=['users'],values='rating')
       # mo.replace({np.nan: 0}, regex=True, inplace = True)
        mo = mo.fillna(0)
        model_knn = NearestNeighbors(algorithm='brute', metric='cosine',n_neighbors=7)
        model_knn.fit(mo.values)
       # user = 12
        movies = fav
        distances, indices = model_knn.kneighbors(mo.iloc[movies,:].values.reshape(1, -1),return_distance=True) #reshape(1, -1)
        
        queryset = list(map(lambda x: Movie.objects.get(id=indices.flatten()[x] ),range(0, len(distances.flatten() ))))
        return queryset

    permission_classes = (permissions.IsAuthenticated, )



""" ----------------------Userbased_KNN_Set List get request Set--------------------  """

class Userbased_KNN_Set(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer

    serializer_class = MoviesSerializer
   #permission_classes = (permissions.IsAuthenticated, )
    #serializer_class = LinksSerializer

    def get_queryset(self):
        print(self.request.user.id)
        num_reviews = Review.objects.count()
        all_user_names = list(map(lambda x: x.id, User.objects.only("id")))
        all_movie_ids = set(map(lambda x: x.movie.id, Review.objects.only("movie")))
        num_users = len(list(all_user_names))
        movieRatings_m = sp.sparse.dok_matrix((num_users, max(all_movie_ids)+1),dtype=np.float32)#
        for i in range(num_users):
            user_reviews = Review.objects.filter(user_id = all_user_names[i])
            for user_review in user_reviews:
                movieRatings_m[i,user_review.movie.id] = user_review.rating 
        movieRatings = movieRatings_m.transpose()
        coo = movieRatings.tocoo(copy=False)
        df=pd.DataFrame({'movies': coo.row, 'users': coo.col, 'rating': coo.data})[
            ['movies', 'users', 'rating']].sort_values(['movies','users']).reset_index(drop=True)

        mo=df.pivot_table(index=['users'],columns=['movies'],values='rating')
       # mo.replace({np.nan: 0}, regex=True, inplace = True)
        mo = mo.fillna(0)
        #user = 12
        model_knn = NearestNeighbors(algorithm='brute', metric='cosine',n_neighbors=9)
        model_knn.fit(mo.values)
        users = self.request.user.id
        
        distances, indices = model_knn.kneighbors(mo.iloc[users-1,:].values.reshape(1, -1),return_distance=True) #reshape(1, -1)
        
        queryset = list(map(lambda x: Movie.objects.get(id=indices.flatten()[x] ),range(0, len(distances.flatten() ))))
       
        return queryset

    permission_classes = (permissions.IsAuthenticated, )

""" ----------------------MovieSuggetions_Itembased_MatrixFacto--------------------  """

class MovieSuggetions_Itembased_MatrixFacto(viewsets.ModelViewSet):
    #serializer_class = ReviewSerializer

    serializer_class = MoviesSerializer
    #serializer_class = LinksSerializer
    
    def get_queryset(self):
        num_reviews = Review.objects.count()
        all_user_names = list(map(lambda x: x.id, User.objects.only("id")))
        all_movie_ids = set(map(lambda x: x.movie.id, Review.objects.only("movie")))
        num_users = len(list(all_user_names))
        movieRatings_m = sp.sparse.dok_matrix((num_users, max(all_movie_ids)+1),dtype=np.float32)#
        for i in range(num_users):
            user_reviews = Review.objects.filter(user_id = all_user_names[i])
            for user_review in user_reviews:
                movieRatings_m[i,user_review.movie.id] = user_review.rating 
        movieRatings = movieRatings_m.transpose()
        coo = movieRatings.tocoo(copy=False)
        df=pd.DataFrame({'movies': coo.row, 'users': coo.col, 'rating': coo.data})[['movies', 'users', 'rating']].sort_values(['movies','users']).reset_index(drop=True)

        mo=df.pivot_table(index=['movies'],columns=['users'],values='rating',aggfunc=np.max)
       # mo.replace({np.nan: 0}, regex=True, inplace = True)
        mo = mo.fillna(0)

        A = mo.values#as_matrix()

        user_rating_mean = np.mean(A, axis = 1)

        A_normalized = A - user_rating_mean.reshape(-1,1)

        U,sigma,Vt = svds(A_normalized, k = 50)

        sigma = np.diag(sigma)

        predicted_rating = np.dot(np.dot(U, sigma),Vt) + user_rating_mean.reshape(-1,1)


        predicted_rating_df = pd.DataFrame(predicted_rating, columns = mo.columns)
        preds_df = np.transpose(predicted_rating_df)

        item_similarity = cosine_similarity(preds_df)

        item_sim_df = pd.DataFrame(item_similarity , index = preds_df.index, columns = preds_df.index)
        movies =89745
        print (item_sim_df)
        queryset = item_sim_df


        #sim_movies_to(89745) 

        return queryset














# from rest_framework.generics import (
#     ListAPIView, 
#     RetrieveAPIView, 
#     CreateAPIView,
#     DestroyAPIView,
#     UpdateAPIView
#     )

# class MovieListView(ListAPIView):
#     #queryset = Movie.objects.all()
#     #queryset = Movie.objects.order_by('-title')[:20]
#    # queryset = Links.objects.all()
#     queryset = Review.objects.all()

#     #serializer_class = MoviesSerializer
#     serializer_class = ReviewSerializer
#    # serializer_class = LinksSerializer


# class MovieDetailsView(RetrieveAPIView):

#     #queryset = Movie.objects.order_by('-title')[:20]
#     #queryset = Movie.objects.all()
#    # queryset = Links.objects.all()
#     queryset = Review.objects.all()

#    # serializer_class = LinksSerializer
#     #serializer_class = MoviesSerializer
#     serializer_class = ReviewSerializer

# class ReviewCreateView(CreateAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer

# class ReviewUpdateView(UpdateAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer

# class ReviewDeleteView(DestroyAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
