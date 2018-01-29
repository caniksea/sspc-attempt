import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ADDRESS_TYPE_OPTIONS} from '../../../conf/util';
import {AppUtil} from '../../../conf/app-util';
import {UserService} from '../../../shared/services/user.service';
import {UserDetails} from '../../../shared/models/user-details';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [UserService]
})
export class ProfileComponent implements OnInit {

    email: string;
    addressTypeList: string[];
    fName: string;
    lName: string;
    selectedAddressType: string;
    addy: string;
    sub: string;
    cty: string;
    postCode: string;
    profileDetails: UserDetails;
    showEditButton: boolean;
    showManageButtons: boolean;
    showBackToFSViewBtn: boolean;

    public profileForm: FormGroup;
    public firstName: AbstractControl;
    public lastName: AbstractControl;
    public addressType: AbstractControl;
    public address: AbstractControl;
    public suburb: AbstractControl;
    public city: AbstractControl;
    public postalCode: AbstractControl;

    constructor(private builder: FormBuilder,
                private userService: UserService) {
    }

    ngOnInit() {
        this.addressTypeList = ADDRESS_TYPE_OPTIONS;
        this.email = AppUtil.getCurrentUser();

        this.profileForm = this.builder.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'addressType': ['', Validators.required],
            'address': ['', Validators.required],
            'suburb': ['', Validators.required],
            'city': ['', Validators.required],
            'postalCode': ['', Validators.required]
        });

        this.firstName = this.profileForm.controls['firstName'];
        this.lastName = this.profileForm.controls['lastName'];
        this.addressType = this.profileForm.controls['addressType'];
        this.address = this.profileForm.controls['address'];
        this.suburb = this.profileForm.controls['suburb'];
        this.city = this.profileForm.controls['city'];
        this.postalCode = this.profileForm.controls['postalCode'];

        this.disableFormElements();
        this.showEditButton = true;

        this.getUserDetails();

    }

    private getUserDetails() {
        this.userService.getUsersData().subscribe(uds => {
            if (uds) {
                const uda = uds.filter(ds => ds.email === this.email);
                if (uda && uda.length > 0) {
                    this.profileDetails = uda[0];
                    this.fName = this.profileDetails.firstName ? this.profileDetails.firstName : '';
                    this.lName = this.profileDetails.lastName ? this.profileDetails.lastName : '';
                    this.selectedAddressType = this.profileDetails.addressType ? this.profileDetails.addressType : '';
                    this.addy = this.profileDetails.address ? this.profileDetails.address : '';
                    this.sub = this.profileDetails.suburb ? this.profileDetails.suburb : '';
                    this.cty = this.profileDetails.city ? this.profileDetails.city : '';
                    this.postCode = this.profileDetails.postalCode ? this.profileDetails.postalCode : '';
                }
            }
        });
    }

    private disableFormElements() {
        this.firstName.disable(true);
        this.lastName.disable(true);
        this.addressType.disable(true);
        this.address.disable(true);
        this.suburb.disable(true);
        this.city.disable(true);
        this.postalCode.disable(true);
    }

    allowEdit(b: boolean) {
        this.showManageButtons = b;
        this.showEditButton = !b;
        this.toggleElements(b);
    }

    private toggleElements(b: boolean) {
        if (b) this.enableFormElements();
        else this.disableFormElements();
    }

    private enableFormElements() {
        this.firstName.enable(true);
        this.lastName.enable(true);
        this.addressType.enable(true);
        this.address.enable(true);
        this.suburb.enable(true);
        this.city.enable(true);
        this.postalCode.enable(true);
    }

    saveProfile(model, isValid: boolean) {
        if (isValid) {
            this.profileDetails.firstName = model.firstName;
            this.profileDetails.lastName = model.lastName;
            this.profileDetails.addressType = model.addressType;
            this.profileDetails.address = model.address;
            this.profileDetails.suburb = model.suburb;
            this.profileDetails.city = model.city;
            this.profileDetails.postalCode = model.postalCode;
            this.userService.updateUserDetails(this.profileDetails).subscribe(ud => {
                if (ud) console.log('Profile Updated');
            })
        }
    }
}
