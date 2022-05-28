
from django.db import models
from django.shortcuts import render
from django.utils.functional import Promise
from officialapi.models import service_request,fitness,cycle,badminton,branch

# Create your views here.

def login(request):
    return render(request,'branch/signin.html')

def dashboard(request):
    return render(request,'branch/dashboard.html')

def create_service_requests(request):
    return render(request, 'branch/create_service_requests.html')

def technicians(request):
    return render(request,'branch/technicians.html')

def brands(request):
    return render(request, 'branch/brands.html')

def wheel_size(request):
    return render(request, 'branch/wheelsize.html')

def complaints(request):
    return render(request, 'branch/complaints.html')

def accessories(request):
    return render(request, 'branch/accessories.html')

def machine_type(request):
    return render(request, 'branch/machine_type.html')

def model_no(request):
    return render(request, 'branch/model-no.html')

def model_name(request):
    return render(request, 'branch/model_name.html')

def service_requests(request):
    return render(request,'branch/service-request.html')

def job_card(request,pk):
    category =''
    fitnessJobCardId = ''
    cycleJobCardId = ''
    badmintonJobCardId = ''
    branchs = branch.objects.all()
    try:
        category = service_request.objects.get(id= pk).category
        if category == 'fitness':
            fitnessJobCardId = fitness.objects.filter(service_request_id = pk).exists()
            if fitnessJobCardId == True:
                fitnessJobCardId = fitness.objects.get(service_request_id = pk).id
            else:
                fitnessJobCardId = 0
        elif category == 'cycle':
            cycleJobCardId = cycle.objects.filter(service_request_id = pk).exists()
            if cycleJobCardId == True:
                cycleJobCardId = cycle.objects.get(service_request_id = pk).id
            else:
                cycleJobCardId = 0

        else:
            badmintonJobCardId = badminton.objects.filter(service_request_id = pk).exists()
            if badmintonJobCardId == True:
                badmintonJobCardId = badminton.objects.get(service_request_id = pk).id
            else:
                badmintonJobCardId = 0

    except:
        pass
    
    return render(request,'branch/job-card.html',{'category':category,'pk':pk,'fitnesesJobCardId':fitnessJobCardId,'cycleJobCardId':cycleJobCardId,'badmintonJobCardId':badmintonJobCardId,'branch':branchs})

def jobs(request):
    return render(request,'branch/jobs.html')

def completed(request):
    return render(request,'branch/completed.html')

def printForm(request,serviceRequest):
    jobCardId = ''
    
    try:
        category = service_request.objects.get(id= serviceRequest).category
        if category == 'fitness':
            fitnessJobCardId = fitness.objects.filter(service_request_id = serviceRequest).exists()
            if fitnessJobCardId == True:
                jobCardId = fitness.objects.get(service_request_id = serviceRequest).id
            else:
                jobCardId = 0
        elif category == 'cycle':
            cycleJobCardId = cycle.objects.filter(service_request_id = serviceRequest).exists()
            if cycleJobCardId == True:
                jobCardId = cycle.objects.get(service_request_id = serviceRequest).id
            else:
                jobCardId = 0

        else:
            badmintonJobCardId = badminton.objects.filter(service_request_id = serviceRequest).exists()
            if badmintonJobCardId == True:
                jobCardId = badminton.objects.get(service_request_id = serviceRequest).id
            else:
                jobCardId = 0

    except:
        pass
    return render(request,'branch/print.html',{'job_card':jobCardId})

