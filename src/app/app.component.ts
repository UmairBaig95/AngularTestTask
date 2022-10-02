import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'; 
import axios from 'axios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data?: Array<any>;
  url?: String;
  httpClient: any;
  postId: any;
  postData?: Array<any>;
  showForm?: boolean;
  id?: number;
  title?: String;
  body?: String;
  closeResult?: String;
  constructor(private modalService: NgbModal) {
    this.data = new Array<any>(); 
  }

  openModal(content: any, data: any) {
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openDeleteModal(contentdel: any, data: any) {
    this.id = data.id; 
    this.modalService
      .open(contentdel, { ariaLabelledBy: 'modal-basic-title-del' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getDataFromAPI() {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        this.data = response.data;
        this.showForm = false;
      })
      .catch((e) => {});
  }
  postDataOfForm() {
    console.log(this.body, this.title);
    axios.post(`https://jsonplaceholder.typicode.com/posts`, {
      title: this.title,
      body: this.body,
    });
    this.title = '';
    this.body = '';
    alert("Posted")
  }

  getPostById() {
    let id: number = 1;
    let endPoints = '/posts/' + id;
    this.postData = new Array<any>();
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        this.data = [];
        this.showForm = true;
        this.postData = response.data;
        console.log(this.postData);
      });
  }

  DeletePost() {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
      .then((response) => {
        alert('Deleted');
      });
      
  }
  updateData() {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${this.id}`, {
      title: this.title,
      body: this.body,
    });
    this.title = '';
    this.body = '';
    alert('Data Updated');
  }
}
