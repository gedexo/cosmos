from enum import unique
from operator import mod
from statistics import mode
from django.db import models
# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.base import ModelState
from django.db.models.fields import NullBooleanField
from django.urls.resolvers import CheckURLMixin
from tinymce.models import HTMLField
from datetime import datetime
from versatileimagefield.fields import VersatileImageField, PPOIField
from phonenumber_field.modelfields import PhoneNumberField

class branch(models.Model):
    type = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    address = models.CharField(null=True,blank=True,max_length=100)
    phone = models.CharField(null=True,blank=True,max_length=50)
    place = models.CharField(null=True,blank=True,max_length=50)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create Save a User"""
        if not email:
            raise ValueError('User must have a Email')
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        if user:
            return user

    def create_superuser(self, email, password,**extra_fields):
        """Create and Save a super User"""

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user
        


class User(AbstractBaseUser, PermissionsMixin):
    """"Custom Model"""
    email     = models.EmailField(max_length=225, unique=True)
    full_name = models.CharField(max_length=225)
    is_active = models.BooleanField(default=True)
    is_staff  = models.BooleanField(default=False)
    branch = models.ForeignKey(branch, on_delete = models.CASCADE,null=True,blank=True)
    designation = models.CharField(max_length=50,null=True,blank=True)
    phone = models.CharField(max_length=50,null=True,blank=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        return str(self.email)

class service_request(models.Model):
    STATUS_CHOICES = (('open','open' ),('pending','pending'),('attended','attended'),('completed','completed'))
    CATEGORY_CHOICES = (('fitness','fitness'),('shuttle','shuttle'),('cycle','cycle'))
    date = models.DateTimeField(null=True,blank=True)
    updated_date = models.DateTimeField(auto_now=True,null=True,blank=True)
    category = models.CharField(max_length=50)
    service_type = models.CharField(max_length=100)
    name = models.CharField(max_length=50)
    phone = PhoneNumberField()
    branch = models.ForeignKey(branch,on_delete=models.CASCADE)
    description = models.CharField(max_length=200)
    status = models.CharField(max_length=50,choices=STATUS_CHOICES)


class technician(models.Model):
    category_choices = (('fitness','fitness'),('cycle','cycle'),('badminton','badminton'))
    technician_id = models.CharField(max_length=50,null=True,blank=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=70,choices=category_choices)
    phone = models.CharField(null=True,blank=True,max_length=50)
    address = models.CharField(null=True,blank=True,max_length=50)
    branch = models.ForeignKey(branch,on_delete=models.CASCADE,)
 
class machine_type(models.Model):
    type = models.CharField(max_length=100)
    branch = models.ForeignKey(branch,on_delete=models.CASCADE)
    class Meta:
        unique_together = ('type', 'branch',)

class model_no(models.Model):
    model = models.CharField(max_length=100)
    branch = models.ForeignKey(branch,on_delete=models.CASCADE)
    class Meta:
        unique_together = ('model', 'branch',)

class brand(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(null=True,blank=True,max_length=100)
    branch = models.ForeignKey(branch,on_delete=models.CASCADE,)
    class Meta:
        unique_together = ('name', 'branch','category')

class wheel_size(models.Model):
    size = models.CharField(max_length=300)
    branch = models.ForeignKey(branch,on_delete=models.CASCADE,)
    class Meta:
        unique_together = ('size', 'branch',)

class complaint(models.Model):
    complaint = models.CharField(max_length=50)
    category = models.CharField(null=True,blank=True,max_length=60)
    branch = models.ForeignKey(branch,on_delete=models.CASCADE,)
    class Meta:
        unique_together = ('complaint','category','branch',)

class accessories(models.Model):
    accessories = models.CharField(max_length=50)
    branch = models.ForeignKey(branch,on_delete=models.CASCADE,)
    class Meta:
        unique_together = ('accessories', 'branch',)
        
class model_name(models.Model):
    name = models.CharField(max_length=100)
    branch = models.ForeignKey(branch,on_delete=models.CASCADE,)
    class Meta:
        unique_together = ('name', 'branch',)

class fitness(models.Model):
    STATUS_CHOICES = (('open','open' ),('pending','pending'),('attended','attended'),('completed','completed'))
    customer_address = HTMLField('content',max_length=400, null=True,blank=True)
    machine_type = models.ForeignKey(machine_type,on_delete=models.CASCADE,null=True,blank=True)
    model_no = models.ForeignKey(model_no,on_delete=models.CASCADE,null=True,blank=True)
    date_of_purchase = models.DateField(null=True,blank=True)
    amc = models.BooleanField(default=False)
    remark = models.CharField(max_length=400,null=True,blank=True)
    has_warranty = models.BooleanField(default=False)
    technician_name = models.ForeignKey(technician,on_delete=models.CASCADE,null=True,blank=True,related_name='technician')
    customer_attended_technician = models.ForeignKey(technician,on_delete=models.CASCADE,null=True,blank=True,related_name='customer_attended_technician')
    action_taken = HTMLField('content',max_length=250,null=True,blank=True)
    attended_date = models.DateField(null=True,blank=True)
    status = models.CharField(max_length=50,null=True,blank=True,choices=STATUS_CHOICES)
    pending_reason = models.CharField(max_length=100,null=True,blank=True)
    completed_date = models.DateField(null=True,blank=True)
    service_charge = models.IntegerField(null=True,blank=True)
    service_request = models.OneToOneField(service_request,on_delete=models.CASCADE,)

class cycle(models.Model):
    STATUS_CHOICES = (('open','open' ),('pending','pending'),('attended','attended'),('completed','completed'))
    customer_address = HTMLField('content',max_length=400, null=True,blank=True)
    reported_date = models.DateField(null=True,blank=True)
    model_name = models.ForeignKey(model_name,on_delete=models.CASCADE,null=True,blank=True)
    date_of_purchase = models.DateField(null=True,blank=True)
    color = models.CharField(null=True,blank=True,max_length=50)
    size = models.ForeignKey(wheel_size,on_delete=models.CASCADE,null=True,blank=True)
    brand = models.ForeignKey(brand,on_delete=models.CASCADE,null=True,blank=True)
    frame_no = models.CharField(max_length=100,null=True,blank=True)
    service_attended_date= models.DateField(null=True,blank=True)
    has_warranty = models.BooleanField(default=False)
    water_service = models.BooleanField(default=False)
    customer_attended_technician = models.ForeignKey(technician,on_delete=models.CASCADE,null=True,blank=True,related_name='customer_attend_technician')
    technician_name = models.ForeignKey(technician,on_delete=models.CASCADE,null=True,blank=True,related_name='technician_name')
    action_taken = HTMLField('content',max_length=250,null=True,blank=True)
    attended_date = models.DateField(null=True,blank=True)
    remarks = models.CharField(null=True,blank=True,max_length=500)
    status = models.CharField(max_length=50,null=True,blank=True,choices=STATUS_CHOICES)
    pending_reason = models.CharField(max_length=100,null=True,blank=True)
    completed_date = models.DateField(null=True,blank=True)
    service_charge = models.IntegerField(null=True,blank=True)
    service_request = models.OneToOneField(service_request,on_delete=models.CASCADE,)

class badminton(models.Model):
    STATUS_CHOICES = (('open','open' ),('pending','pending'),('attended','attended'),('completed','completed'))
    name = models.CharField(null=True,blank=True,max_length=50)
    phone = models.CharField(null=True,blank=True,max_length=50)
    attended_date = models.DateField(null=True,blank=True)
    nearest_branch = models.ForeignKey(branch,on_delete=models.CASCADE,null=True,blank=True,)
    jobcard_no = models.CharField(null=True,blank=True,max_length=100) 
    services = models.CharField(null=True,blank=True,max_length=50)
    item_name = models.CharField(null=True,blank=True,max_length=100)
    code = models.CharField(null=True,blank=True,max_length=100)
    color = models.CharField(null=True,blank=True,max_length=100)
    lbs = models.CharField(null=True,blank=True,max_length=100)
    cover = models.CharField(null=True,blank=True,max_length=50)
    bat_type = models.CharField(null=True,blank=True,max_length=50)
    expected_time = models.DateField(null=True,blank=True,max_length=50)
    payment_recieved = models.CharField(null=True,blank=True,max_length=70)
    brand = models.ForeignKey(brand,on_delete=models.CASCADE,null=True,blank=True)
    model = models.ForeignKey(model_no,on_delete=models.CASCADE,null=True,blank=True)
    technician = models.ForeignKey(technician,on_delete=models.CASCADE,null=True,blank=True)
    remarks = models.CharField(null=True,blank=True,max_length=500)
    status = models.CharField(null=True,blank=True,choices=STATUS_CHOICES,max_length=50)
    amount = models.IntegerField(null=True,blank=True)
    pending_reason = models.CharField(max_length=100,null=True,blank=True)
    completed_date = models.DateField(null=True,blank=True)
    service_request = models.OneToOneField(service_request,on_delete=models.CASCADE,)

class complaints_jobcard(models.Model):
    complaint = models.ForeignKey(complaint,on_delete=models.CASCADE,)
    service_request = models.ForeignKey(service_request,on_delete=models.CASCADE,)
    class Meta:
        unique_together = ('complaint','service_request')

class accessories_jobcard(models.Model):
    accessories = models.ForeignKey(accessories,on_delete=models.CASCADE)
    service_request = models.ForeignKey(service_request,on_delete=models.CASCADE)
    class Meta:
        unique_together = ('accessories', 'service_request')

class used_parts(models.Model):
    service_request = models.ForeignKey(service_request,on_delete=models.CASCADE)
    item_code = models.CharField(max_length=50)
    item_name = models.CharField(max_length=50)
    foc = models.BooleanField(default=False)
    amount = models.IntegerField()

class products(models.Model):
    image = VersatileImageField(upload_to = 'productimage',ppoi_field='image_ppoi',blank =True)
    image_ppoi = PPOIField()
    title = models.CharField(max_length=100)
    url = models.URLField(max_length=200)
    current_price = models.CharField(max_length=50,null=True,blank=True)
    previous_price = models.CharField(max_length=50,null=True,blank=True)
    best_seller = models.BooleanField(default=False)

class slider(models.Model):
    image = VersatileImageField(upload_to = 'sliderimage',ppoi_field='image_ppoi',blank =True)
    image_ppoi = PPOIField()
    title = models.CharField(max_length=100)
    paragraph = models.CharField(max_length=100,null=True,blank=True)
    url = models.URLField(null=True,blank=True)

class blog(models.Model):
    date = models.DateField(auto_now_add=True)
    heading = models.CharField(max_length=100)
    content = models.TextField(max_length=10000)
    image_one = VersatileImageField(upload_to = 'blogimage',ppoi_field='image_ppoi',blank =True)
    image_ppoi = PPOIField()
    image_two = VersatileImageField(upload_to = 'blogimage',ppoi_field='image_ppoi',blank =True)
    image_ppoi = PPOIField()

class banner(models.Model):
    image = VersatileImageField(upload_to = 'bannerimage',ppoi_field='image_ppoi',blank =True)
    image_ppoi = PPOIField()
    title = models.CharField(max_length=100)
    url = models.URLField(max_length=200)

class brands(models.Model):
    image = VersatileImageField(upload_to = 'brands',ppoi_field='image_ppoi',blank =True)
    image_ppoi = PPOIField()
    
class ads(models.Model):
    image_one = VersatileImageField(upload_to = 'ads',ppoi_field='image_ppoi',blank =True)
    image_ppoi = PPOIField()
    image_two = VersatileImageField(upload_to = 'ads',ppoi_field='image_ppoi',blank =True)
    image_ppoi = PPOIField()
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=150)
    url = models.URLField()
    
class logs(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    service_request = models.ForeignKey(service_request,on_delete=models.CASCADE)
    entry = models.CharField(max_length=200)
    user = models.CharField(max_length = 70)