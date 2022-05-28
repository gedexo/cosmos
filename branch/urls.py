
from . import views
from django.urls import path,include

urlpatterns = [
    path('',views.login),
    path('dashboard/',views.dashboard),
    path('create-service-requests/',views.create_service_requests),
    path('technicians/',views.technicians),
    path('brands/',views.brands),
    path('wheelsize/',views.wheel_size),
    path('complaints/',views.complaints),
    path('machine-type/',views.machine_type),
    path('model-no/',views.model_no),
    path('model-name/',views.model_name),
    path('accessories/',views.accessories),
    path('service-request/',views.service_requests),
    path('job-card/<str:pk>/',views.job_card),
    path('jobs/',views.jobs),
    path('completed/',views.completed),
    path('print/<str:serviceRequest>/',views.printForm)
]
