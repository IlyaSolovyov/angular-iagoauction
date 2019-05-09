import { Component } from '@angular/core';
import { Painting } from '../../../shared/models/painting';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaintingsService } from '../../../shared/services/paintings.service';

@Component({
  selector: 'admin-add-paintings',
  templateUrl: './add-paintings.component.html',
  styleUrls: ['./add-paintings.component.scss']
})

export class AddPaintingsComponent {
  painting: Painting;
  paintingCreationForm: FormGroup;

  mode: string;
  title: string;
  image: File;

  constructor(private paintingsService: PaintingsService, private route: ActivatedRoute) {
    this.painting = new Painting(0, '', '', '', 0, '');
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { painting: Painting }) => {
        if (data.painting) {
          this.painting = new Painting(data.painting.id,
            data.painting.title,
            data.painting.description,
            data.painting.author,
            data.painting.suggestedStartPrice,
            data.painting.imageUrl
          );
          this.mode = PaintingCreationType.Edit;
          this.title = `Edit Painting #${this.painting.id}`;
        } else {
          this.mode = PaintingCreationType.Create;
          this.title = 'Create new article';
        }

        this.paintingCreationForm = new FormGroup({
          titleControl: new FormControl(this.painting.title),
          descriptionControl: new FormControl(this.painting.description),
          authorControl: new FormControl(this.painting.author),
          priceControl: new FormControl(this.painting.suggestedStartPrice),
          imageControl: new FormControl(this.painting.imageUrl),
        });

      });
  }

  onSubmit() {
    console.log('Sending form data:');
    this.painting.title = this.paintingCreationForm.get('titleControl').value;
    this.painting.description = this.paintingCreationForm.get('descriptionControl').value;
    this.painting.author = this.paintingCreationForm.get('authorControl').value;
    this.painting.suggestedStartPrice = this.paintingCreationForm.get('priceControl').value;
    this.painting.imageUrl = this.paintingCreationForm.get('imageControl').value;

    this.paintingsService.addPainting(this.painting);
  }
}

export const PaintingCreationType = Object.freeze({
  Create: 'Create',
  Edit: 'Edit'
})
