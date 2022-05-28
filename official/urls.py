from . import views
from django.urls import path,include
 
urlpatterns = [
    path('',views.log_in),
    path('dashboard/',views.Dashboard),
    path('branch/',views.Branch),
    path('user/<str:pk>/',views.User),
    path('service-requests/',views.service_requests),
    path('logs/',views.logs),
    path('reports/',views.filter_reports),
    path('add-user/',views.admin_user),
    path('products/',views.products),
    path('slider/',views.slider),
    path('blog/',views.blog),
    path('banner/',views.banner),
    path('job-card/<str:pk>/',views.job_card),
    path('brands/',views.brand),
    path('ads/',views.ads),
    path('print/<str:serviceRequest>/',views.printForm),

    path('about-branch/',views.about_branch,name='about_branch'),

]
