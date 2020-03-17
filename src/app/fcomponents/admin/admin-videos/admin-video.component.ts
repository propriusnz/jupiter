import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../service/product.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-admin-video",
  templateUrl: "./admin-video.component.html",
  styleUrls: ["./admin-video.component.css"]
})

export class AdminVideoComponent implements OnInit {

    videoForm = new FormArray([]);

  constructor(
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
      this.productService.getVideos().subscribe(
          (res)=>{console.log(res), this.generateTable(res)  },
          (err)=>{console.warn(err) }
      )
  }

  generateTable(data){
      console.log(data)
    data.forEach(element => {
        this.videoForm.push(this.videoFormControl(element))
        // ele
    });
    console.log(this.videoForm)

  }

  videoFormControl(formData) : FormGroup{
      console.log(formData)
    return this.formBuilder.group({
      id: [{value: formData.id, disabled: true}],
      url: {value : formData.url, disabled: false},
      description: {value: formData.description, disabled: false},
      type: {value: formData.type, disabled: true},
    })
  }


  updateVideo(video){
    console.log(video)
    this.videoUpdate(video.controls.id.value, video.value)
  }


  videoUpdate(data, id){
    this.productService.updateVideo(data, id).subscribe(
        (res)=>{console.log(res)  },
        (err)=>{console.warn(err)}
    )
  }

  videoCleaner(s){
    console.log('s')
    return this.sanitizer.bypassSecurityTrustResourceUrl(s)
  }

}