from django.urls import path,include
from . import views


urlpatterns = [
    path('',views.index),
    path('service/',views.service,name='service'),
    path('service-request/<str:category>/<str:service_type>/',views.service_request),
    path('about/',views.about),
    path('blog/<str:slug>/',views.blogs),
    path('branches/',views.branches),
    path('branch-details/<str:test>/',views.branch_single),
]