import { Component, OnInit } from '@angular/core';
// Import pdfmake-wrapper and the fonts to use
import {
  PdfMakeWrapper,
  Canvas,
  Rect,
  Table,
  Img,
  Txt,
  Ul,
  TextReference,
  Cell,
  Columns,
  QR,
  Toc,
  Stack,
} from 'pdfmake-wrapper';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export class Resume {
  profilePic: string;
  name: string;
  address: string;
  contactNo: number;
  email: string;
  socialProfile: string;
  experiences: Experience[] = [];
  educations: Education[] = [];
  otherDetails: string;
  skills: Skill[] = [];
  constructor() {
    this.experiences.push(new Experience());
    this.educations.push(new Education());
    this.skills.push(new Skill());
  }
}
export class Experience {
  employer: string;
  jobTitle: string;
  jobDescription: string;
  startDate: string;
  experience: number;
}
export class Education {
  degree: string;
  college: string;
  passingYear: string;
  percentage: number;
}
export class Skill {
  value: string;
}

@Component({
  selector: 'app-pdf-maker',
  templateUrl: './pdf-maker.component.html',
  styleUrls: ['./pdf-maker.component.scss'],
})
export class PdfMakerComponent implements OnInit {
  private red: string = '#f80303';
  private black: string = '#000000';
  private white: string = '#ffffff';
  private brown: string = '#b67171';

  resume = new Resume();

  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];

  constructor() {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }
  }

  ngOnInit(): void {}

  drawHeart() {
    const pdf = new PdfMakeWrapper();

    pdf.add(new Canvas([...this.heart()]).end);

    pdf.create().open();
  }

  pixel(x: number, y: number, color: string) {
    return (
      // .lineColor(this.red)
      new Rect([this.draw(x), this.draw(y)], this.draw()).color(color).end
    );
  }

  draw(num: number = 1) {
    const pixelSize = 15;
    return pixelSize * num;
  }

  heart() {
    return [
      // this.pixel(2,0, this.black),
      // this.pixel(3,0, this.black),
      // this.pixel(4,0, this.black),
      // this.pixel(8,0, this.black),
      // this.pixel(9,0, this.black),
      // this.pixel(10,0, this.black),

      // this.pixel(1,1, this.black),
      // this.pixel(2,1, this.red),
      // this.pixel(3,1, this.red),
      // this.pixel(4,1, this.red),
      // this.pixel(5,1, this.black),
      // this.pixel(7,1, this.black),
      // this.pixel(8,1, this.red),
      // this.pixel(9,1, this.red),
      // this.pixel(10,1, this.red),
      // this.pixel(11,1, this.black),

      // this.pixel(0,2, this.black),
      // this.pixel(1,2, this.red),
      // this.pixel(2,2, this.white),
      // this.pixel(3,2, this.white),
      // this.pixel(4,2, this.red),
      // this.pixel(5,2, this.red),
      // this.pixel(6,2, this.black),
      // this.pixel(7,2, this.red),
      // this.pixel(8,2, this.red),
      // this.pixel(9,2, this.red),
      // this.pixel(10,2, this.red),
      // this.pixel(11,2, this.red),
      // this.pixel(12,2, this.black),

      // this.pixel(0,3, this.black),
      // this.pixel(1,3, this.red),
      // this.pixel(2,3, this.white),
      // this.pixel(3,3, this.red),
      // this.pixel(4,3, this.red),
      // this.pixel(5,3, this.red),
      // this.pixel(6,3, this.red),
      // this.pixel(7,3, this.red),
      // this.pixel(8,3, this.red),
      // this.pixel(9,3, this.red),
      // this.pixel(10,3, this.red),
      // this.pixel(11,3, this.red),
      // this.pixel(12,3, this.black),

      // this.pixel(0,4, this.black),
      // this.pixel(1,4, this.red),
      // this.pixel(2,4, this.red),
      // this.pixel(3,4, this.red),
      // this.pixel(4,4, this.red),
      // this.pixel(5,4, this.red),
      // this.pixel(6,4, this.red),
      // this.pixel(7,4, this.red),
      // this.pixel(8,4, this.red),
      // this.pixel(9,4, this.red),
      // this.pixel(10,4, this.red),
      // this.pixel(11,4, this.red),
      // this.pixel(12,4, this.black),

      // this.pixel(1,5, this.black),
      // this.pixel(2,5, this.red),
      // this.pixel(3,5, this.red),
      // this.pixel(4,5, this.red),
      // this.pixel(5,5, this.red),
      // this.pixel(6,5, this.red),
      // this.pixel(7,5, this.red),
      // this.pixel(8,5, this.red),
      // this.pixel(9,5, this.red),
      // this.pixel(10,5, this.red),
      // this.pixel(11,5, this.black),

      // this.pixel(2,6, this.black),
      // this.pixel(3,6, this.red),
      // this.pixel(4,6, this.red),
      // this.pixel(5,6, this.red),
      // this.pixel(6,6, this.red),
      // this.pixel(7,6, this.red),
      // this.pixel(8,6, this.red),
      // this.pixel(9,6, this.red),
      // this.pixel(10,6, this.black),

      // this.pixel(3,7, this.black),
      // this.pixel(4,7, this.red),
      // this.pixel(5,7, this.red),
      // this.pixel(6,7, this.red),
      // this.pixel(7,7, this.red),
      // this.pixel(8,7, this.red),
      // this.pixel(9,7, this.black),

      // this.pixel(4,8, this.black),
      // this.pixel(5,8, this.red),
      // this.pixel(6,8, this.red),
      // this.pixel(7,8, this.red),
      // this.pixel(8,8, this.black),

      // this.pixel(5,9, this.black),
      // this.pixel(6,9, this.red),
      // this.pixel(7,9, this.black),

      // this.pixel(6,10, this.black),

      // this.pixel(3,13, this.black),
      // this.pixel(4,13, this.black),
      // this.pixel(5,13, this.black),

      // this.pixel(5,13, this.black),

      this.pixel(3, 0, this.white),
      this.pixel(4, 0, this.white),
      this.pixel(5, 0, this.black),
      this.pixel(6, 0, this.black),
      this.pixel(7, 0, this.black),
      this.pixel(8, 0, this.white),
      this.pixel(9, 0, this.white),
      this.pixel(10, 0, this.white),
      this.pixel(11, 0, this.white),
      this.pixel(12, 0, this.white),
      this.pixel(13, 0, this.white),
      this.pixel(14, 0, this.white),
      this.pixel(15, 0, this.white),
      this.pixel(16, 0, this.white),
      this.pixel(17, 0, this.white),
      this.pixel(18, 0, this.white),
      this.pixel(19, 0, this.white),
      this.pixel(20, 0, this.black),
      this.pixel(21, 0, this.black),
      this.pixel(22, 0, this.black),
      this.pixel(23, 0, this.white),
      this.pixel(24, 0, this.white),

      this.pixel(3, 1, this.white),
      this.pixel(4, 1, this.black),
      this.pixel(5, 1, this.black),
      this.pixel(6, 1, this.black),
      this.pixel(7, 1, this.black),
      this.pixel(8, 1, this.black),
      this.pixel(9, 1, this.white),
      this.pixel(10, 1, this.black),
      this.pixel(11, 1, this.black),
      this.pixel(12, 1, this.black),
      this.pixel(13, 1, this.black),
      this.pixel(14, 1, this.black),
      this.pixel(15, 1, this.black),
      this.pixel(16, 1, this.black),
      this.pixel(17, 1, this.black),
      this.pixel(18, 1, this.white),
      this.pixel(19, 1, this.black),
      this.pixel(20, 1, this.black),
      this.pixel(21, 1, this.black),
      this.pixel(22, 1, this.black),
      this.pixel(23, 1, this.black),
      this.pixel(24, 1, this.white),

      this.pixel(3, 2, this.black),
      this.pixel(4, 2, this.black),
      this.pixel(5, 2, this.black),
      this.pixel(6, 2, this.black),
      this.pixel(7, 2, this.black),
      this.pixel(8, 2, this.black),
      this.pixel(9, 2, this.black),

      this.pixel(10, 2, this.white),
      this.pixel(11, 2, this.white),
      this.pixel(12, 2, this.white),
      this.pixel(13, 2, this.white),
      this.pixel(14, 2, this.white),
      this.pixel(15, 2, this.white),

      this.pixel(16, 2, this.white),
      this.pixel(17, 2, this.white),
      this.pixel(18, 2, this.black),
      this.pixel(19, 2, this.black),
      this.pixel(20, 2, this.black),
      this.pixel(21, 2, this.black),
      this.pixel(22, 2, this.black),
      this.pixel(23, 2, this.black),
      this.pixel(24, 2, this.black),
      // row 3
      this.pixel(3, 3, this.black),
      this.pixel(4, 3, this.black),
      this.pixel(5, 3, this.black),
      this.pixel(6, 3, this.black),
      this.pixel(7, 3, this.white),
      this.pixel(8, 3, this.white),
      this.pixel(9, 3, this.white),

      this.pixel(10, 3, this.white),
      this.pixel(11, 3, this.white),
      this.pixel(12, 3, this.white),
      this.pixel(13, 3, this.white),
      this.pixel(14, 3, this.white),
      this.pixel(15, 3, this.white),

      this.pixel(16, 3, this.white),
      this.pixel(17, 3, this.white),
      this.pixel(18, 3, this.white),
      this.pixel(19, 3, this.white),
      this.pixel(20, 3, this.white),
      this.pixel(21, 3, this.black),
      this.pixel(22, 3, this.black),
      this.pixel(23, 3, this.black),
      this.pixel(24, 3, this.black),

      // row 4
      this.pixel(3, 4, this.black),
      this.pixel(4, 4, this.black),
      this.pixel(5, 4, this.black),
      this.pixel(6, 4, this.white),
      this.pixel(7, 4, this.white),
      this.pixel(8, 4, this.white),
      this.pixel(9, 4, this.white),

      this.pixel(10, 4, this.white),
      this.pixel(11, 4, this.white),
      this.pixel(12, 4, this.white),
      this.pixel(13, 4, this.white),
      this.pixel(14, 4, this.white),
      this.pixel(15, 4, this.white),

      this.pixel(16, 4, this.white),
      this.pixel(17, 4, this.white),
      this.pixel(18, 4, this.white),
      this.pixel(19, 4, this.white),
      this.pixel(20, 4, this.white),
      this.pixel(21, 4, this.white),
      this.pixel(22, 4, this.black),
      this.pixel(23, 4, this.black),
      this.pixel(24, 4, this.black),

      // row5
      this.pixel(3, 5, this.white),
      this.pixel(4, 5, this.black),
      this.pixel(5, 5, this.white),
      this.pixel(6, 5, this.white),
      this.pixel(7, 5, this.white),
      this.pixel(8, 5, this.white),
      this.pixel(9, 5, this.white),

      this.pixel(10, 5, this.white),
      this.pixel(11, 5, this.white),
      this.pixel(12, 5, this.white),
      this.pixel(13, 5, this.white),
      this.pixel(14, 5, this.white),
      this.pixel(15, 5, this.white),

      this.pixel(16, 5, this.white),
      this.pixel(17, 5, this.white),
      this.pixel(18, 5, this.white),
      this.pixel(19, 5, this.white),
      this.pixel(20, 5, this.white),
      this.pixel(21, 5, this.white),
      this.pixel(22, 5, this.white),
      this.pixel(23, 5, this.black),
      this.pixel(24, 5, this.white),
      // row6
      this.pixel(3, 6, this.white),
      this.pixel(4, 6, this.black),
      this.pixel(5, 6, this.white),
      this.pixel(6, 6, this.white),
      this.pixel(7, 6, this.white),
      this.pixel(8, 6, this.white),
      this.pixel(9, 6, this.white),

      this.pixel(10, 6, this.white),
      this.pixel(11, 6, this.white),
      this.pixel(12, 6, this.white),
      this.pixel(13, 6, this.white),
      this.pixel(14, 6, this.white),
      this.pixel(15, 6, this.white),

      this.pixel(16, 6, this.white),
      this.pixel(17, 6, this.white),
      this.pixel(18, 6, this.white),
      this.pixel(19, 6, this.white),
      this.pixel(20, 6, this.white),
      this.pixel(21, 6, this.white),
      this.pixel(22, 6, this.white),
      this.pixel(23, 6, this.black),
      this.pixel(24, 6, this.white),
      // row7
      this.pixel(3, 7, this.black),
      this.pixel(4, 7, this.white),
      this.pixel(5, 7, this.white),
      this.pixel(6, 7, this.white),
      this.pixel(7, 7, this.white),
      this.pixel(8, 7, this.black),
      this.pixel(9, 7, this.black),
      this.pixel(10, 7, this.black),
      this.pixel(11, 7, this.white),
      this.pixel(12, 7, this.white),
      this.pixel(13, 7, this.white),
      this.pixel(14, 7, this.white),
      this.pixel(15, 7, this.white),

      this.pixel(16, 7, this.white),
      this.pixel(17, 7, this.black),
      this.pixel(18, 7, this.black),
      this.pixel(19, 7, this.black),
      this.pixel(20, 7, this.white),
      this.pixel(21, 7, this.white),
      this.pixel(22, 7, this.white),
      this.pixel(23, 7, this.white),
      this.pixel(24, 7, this.black),

      // row8
      this.pixel(3, 8, this.black),
      this.pixel(4, 8, this.white),
      this.pixel(5, 8, this.white),
      this.pixel(6, 8, this.white),
      this.pixel(7, 8, this.black),
      this.pixel(8, 8, this.black),
      this.pixel(9, 8, this.black),
      this.pixel(10, 8, this.black),
      this.pixel(11, 8, this.black),
      this.pixel(12, 8, this.white),
      this.pixel(13, 8, this.white),
      this.pixel(14, 8, this.white),
      this.pixel(15, 8, this.white),

      this.pixel(16, 8, this.black),
      this.pixel(17, 8, this.black),
      this.pixel(18, 8, this.black),
      this.pixel(19, 8, this.black),
      this.pixel(20, 8, this.black),
      this.pixel(21, 8, this.white),
      this.pixel(22, 8, this.white),
      this.pixel(23, 8, this.white),
      this.pixel(24, 8, this.black),

      // row9
      this.pixel(3, 9, this.black),
      this.pixel(4, 9, this.white),
      this.pixel(5, 9, this.white),
      this.pixel(6, 9, this.black),
      this.pixel(7, 9, this.black),
      this.pixel(8, 9, this.black),
      this.pixel(9, 9, this.black),
      this.pixel(10, 9, this.white),
      this.pixel(11, 9, this.black),
      this.pixel(12, 9, this.white),
      this.pixel(13, 9, this.white),
      this.pixel(14, 9, this.white),
      this.pixel(15, 9, this.white),

      this.pixel(16, 9, this.black),
      this.pixel(17, 9, this.white),
      this.pixel(18, 9, this.black),
      this.pixel(19, 9, this.black),
      this.pixel(20, 9, this.black),
      this.pixel(21, 9, this.black),
      this.pixel(22, 9, this.white),
      this.pixel(23, 9, this.white),
      this.pixel(24, 9, this.black),

      // row10
      this.pixel(3, 10, this.black),
      this.pixel(4, 10, this.white),
      this.pixel(5, 10, this.white),
      this.pixel(6, 10, this.black),
      this.pixel(7, 10, this.black),
      this.pixel(8, 10, this.black),
      this.pixel(9, 10, this.black),
      this.pixel(10, 10, this.white),
      this.pixel(11, 10, this.black),
      this.pixel(12, 10, this.white),
      this.pixel(13, 10, this.white),
      this.pixel(14, 10, this.white),
      this.pixel(15, 10, this.white),

      this.pixel(16, 10, this.black),
      this.pixel(17, 10, this.white),
      this.pixel(18, 10, this.black),
      this.pixel(19, 10, this.black),
      this.pixel(20, 10, this.black),
      this.pixel(21, 10, this.black),
      this.pixel(22, 10, this.white),
      this.pixel(23, 10, this.white),
      this.pixel(24, 10, this.black),
      // row11

      this.pixel(3, 11, this.black),
      this.pixel(4, 11, this.white),
      this.pixel(5, 11, this.white),
      this.pixel(6, 11, this.black),
      this.pixel(7, 11, this.black),
      this.pixel(8, 11, this.black),
      this.pixel(9, 11, this.black),
      this.pixel(10, 11, this.black),
      this.pixel(11, 11, this.white),
      this.pixel(12, 11, this.white),
      this.pixel(13, 11, this.white),
      this.pixel(14, 11, this.white),
      this.pixel(15, 11, this.white),
      this.pixel(16, 11, this.white),
      this.pixel(17, 11, this.black),
      this.pixel(18, 11, this.black),
      this.pixel(19, 11, this.black),
      this.pixel(20, 11, this.black),
      this.pixel(21, 11, this.black),
      this.pixel(22, 11, this.white),
      this.pixel(23, 11, this.white),
      this.pixel(24, 11, this.black),
      // row12

      this.pixel(3, 12, this.black),
      this.pixel(4, 12, this.white),
      this.pixel(5, 12, this.white),
      this.pixel(6, 12, this.white),
      this.pixel(7, 12, this.black),
      this.pixel(8, 12, this.black),
      this.pixel(9, 12, this.black),
      this.pixel(10, 12, this.white),
      this.pixel(11, 12, this.white),
      this.pixel(12, 12, this.white),
      this.pixel(13, 12, this.black),
      this.pixel(14, 12, this.black),
      this.pixel(15, 12, this.white),
      this.pixel(16, 12, this.white),
      this.pixel(17, 12, this.white),
      this.pixel(18, 12, this.black),
      this.pixel(19, 12, this.black),
      this.pixel(20, 12, this.black),
      this.pixel(21, 12, this.white),
      this.pixel(22, 12, this.white),
      this.pixel(23, 12, this.white),
      this.pixel(24, 12, this.black),
      // row13
      this.pixel(3, 13, this.white),
      this.pixel(4, 13, this.black),
      this.pixel(5, 13, this.white),
      this.pixel(6, 13, this.white),
      this.pixel(7, 13, this.white),
      this.pixel(8, 13, this.white),
      this.pixel(9, 13, this.white),
      this.pixel(10, 13, this.white),
      this.pixel(11, 13, this.white),
      this.pixel(12, 13, this.white),
      this.pixel(13, 13, this.black),
      this.pixel(14, 13, this.black),
      this.pixel(15, 13, this.white),
      this.pixel(16, 13, this.white),
      this.pixel(17, 13, this.white),
      this.pixel(18, 13, this.white),
      this.pixel(19, 13, this.white),
      this.pixel(20, 13, this.white),
      this.pixel(21, 13, this.white),
      this.pixel(22, 13, this.white),
      this.pixel(23, 13, this.black),
      this.pixel(24, 13, this.white),
      // row14
      this.pixel(3, 14, this.white),
      this.pixel(4, 14, this.black),
      this.pixel(5, 14, this.black),
      this.pixel(6, 14, this.black),
      this.pixel(7, 14, this.black),
      this.pixel(8, 14, this.white),
      this.pixel(9, 14, this.red),
      this.pixel(10, 14, this.red),
      this.pixel(11, 14, this.red),
      this.pixel(12, 14, this.white),
      this.pixel(13, 14, this.white),
      this.pixel(14, 14, this.white),
      this.pixel(15, 14, this.white),
      this.pixel(16, 14, this.red),
      this.pixel(17, 14, this.red),
      this.pixel(18, 14, this.red),
      this.pixel(19, 14, this.white),
      this.pixel(20, 14, this.black),
      this.pixel(21, 14, this.black),
      this.pixel(22, 14, this.black),
      this.pixel(23, 14, this.black),
      this.pixel(24, 14, this.white),
      // row15
      this.pixel(3, 15, this.black),
      this.pixel(4, 15, this.black),
      this.pixel(5, 15, this.black),
      this.pixel(6, 15, this.black),
      this.pixel(7, 15, this.black),
      this.pixel(8, 15, this.black),
      this.pixel(9, 15, this.red),
      this.pixel(10, 15, this.red),
      this.pixel(11, 15, this.red),
      this.pixel(12, 15, this.red),
      this.pixel(13, 15, this.white),
      this.pixel(14, 15, this.white),
      this.pixel(15, 15, this.red),
      this.pixel(16, 15, this.red),
      this.pixel(17, 15, this.red),
      this.pixel(18, 15, this.red),
      this.pixel(19, 15, this.black),
      this.pixel(20, 15, this.black),
      this.pixel(21, 15, this.black),
      this.pixel(22, 15, this.black),
      this.pixel(23, 15, this.black),
      this.pixel(24, 15, this.black),
      // row16
      this.pixel(3, 16, this.black),
      this.pixel(4, 16, this.black),
      this.pixel(5, 16, this.black),
      this.pixel(6, 16, this.black),
      this.pixel(7, 16, this.black),
      this.pixel(8, 16, this.black),
      this.pixel(9, 16, this.black),
      this.pixel(10, 16, this.red),
      this.pixel(11, 16, this.red),
      this.pixel(12, 16, this.red),
      this.pixel(13, 16, this.red),
      this.pixel(14, 16, this.red),
      this.pixel(15, 16, this.red),
      this.pixel(16, 16, this.red),
      this.pixel(17, 16, this.red),
      this.pixel(18, 16, this.black),
      this.pixel(19, 16, this.black),
      this.pixel(20, 16, this.black),
      this.pixel(21, 16, this.black),
      this.pixel(22, 16, this.black),
      this.pixel(23, 16, this.black),
      this.pixel(24, 16, this.black),
      // row17
      this.pixel(3, 17, this.black),
      this.pixel(4, 17, this.black),
      this.pixel(5, 17, this.black),
      this.pixel(6, 17, this.black),
      this.pixel(7, 17, this.black),
      this.pixel(8, 17, this.black),
      this.pixel(9, 17, this.black),
      this.pixel(10, 17, this.red),
      this.pixel(11, 17, this.red),
      this.pixel(12, 17, this.red),
      this.pixel(13, 17, this.red),
      this.pixel(14, 17, this.red),
      this.pixel(15, 17, this.red),
      this.pixel(16, 17, this.red),
      this.pixel(17, 17, this.red),
      this.pixel(18, 17, this.black),
      this.pixel(19, 17, this.black),
      this.pixel(20, 17, this.black),
      this.pixel(21, 17, this.black),
      this.pixel(22, 17, this.black),
      this.pixel(23, 17, this.black),
      this.pixel(24, 17, this.black),
      // row18
      this.pixel(3, 18, this.black),
      this.pixel(4, 18, this.black),
      this.pixel(5, 18, this.black),
      this.pixel(6, 18, this.black),
      this.pixel(7, 18, this.black),
      this.pixel(8, 18, this.black),
      this.pixel(9, 18, this.black),
      this.pixel(10, 18, this.red),
      this.pixel(11, 18, this.red),
      this.pixel(12, 18, this.red),
      this.pixel(13, 18, this.red),
      this.pixel(14, 18, this.red),
      this.pixel(15, 18, this.red),
      this.pixel(16, 18, this.red),
      this.pixel(17, 18, this.red),
      this.pixel(18, 18, this.black),
      this.pixel(19, 18, this.black),
      this.pixel(20, 18, this.black),
      this.pixel(21, 18, this.black),
      this.pixel(22, 18, this.black),
      this.pixel(23, 18, this.black),
      this.pixel(24, 18, this.black),
      // row19
      this.pixel(3, 19, this.white),
      this.pixel(4, 19, this.black),
      this.pixel(5, 19, this.black),
      this.pixel(6, 19, this.black),
      this.pixel(7, 19, this.black),
      this.pixel(8, 19, this.black),
      this.pixel(9, 19, this.black),
      this.pixel(10, 19, this.red),
      this.pixel(11, 19, this.red),
      this.pixel(12, 19, this.red),
      this.pixel(13, 19, this.red),
      this.pixel(14, 19, this.red),
      this.pixel(15, 19, this.red),
      this.pixel(16, 19, this.red),
      this.pixel(17, 19, this.red),
      this.pixel(18, 19, this.black),
      this.pixel(19, 19, this.black),
      this.pixel(20, 19, this.black),
      this.pixel(21, 19, this.black),
      this.pixel(22, 19, this.black),
      this.pixel(23, 19, this.black),
      this.pixel(24, 19, this.white),
      // row20
      this.pixel(3, 20, this.white),
      this.pixel(4, 20, this.white),
      this.pixel(5, 20, this.black),
      this.pixel(6, 20, this.black),
      this.pixel(7, 20, this.black),
      this.pixel(8, 20, this.black),
      this.pixel(9, 20, this.white),
      this.pixel(10, 20, this.red),
      this.pixel(11, 20, this.red),
      this.pixel(12, 20, this.red),
      this.pixel(13, 20, this.red),
      this.pixel(14, 20, this.red),
      this.pixel(15, 20, this.red),
      this.pixel(16, 20, this.red),
      this.pixel(17, 20, this.red),
      this.pixel(18, 20, this.white),
      this.pixel(19, 20, this.black),
      this.pixel(20, 20, this.black),
      this.pixel(21, 20, this.black),
      this.pixel(22, 20, this.black),
      this.pixel(23, 20, this.white),
      this.pixel(24, 20, this.white),
      // row21
      this.pixel(3, 21, this.white),
      this.pixel(4, 21, this.white),
      this.pixel(5, 21, this.white),
      this.pixel(6, 21, this.white),
      this.pixel(7, 21, this.white),
      this.pixel(8, 21, this.white),
      this.pixel(9, 21, this.white),
      this.pixel(10, 21, this.white),
      this.pixel(11, 21, this.red),
      this.pixel(12, 21, this.red),
      this.pixel(13, 21, this.red),
      this.pixel(14, 21, this.red),
      this.pixel(15, 21, this.red),
      this.pixel(16, 21, this.red),
      this.pixel(17, 21, this.white),
      this.pixel(18, 21, this.white),
      this.pixel(19, 21, this.white),
      this.pixel(20, 21, this.white),
      this.pixel(21, 21, this.white),
      this.pixel(22, 21, this.white),
      this.pixel(23, 21, this.white),
      this.pixel(24, 21, this.white),
      // row22
      this.pixel(3, 22, this.white),
      this.pixel(4, 22, this.white),
      this.pixel(5, 22, this.white),
      this.pixel(6, 22, this.white),
      this.pixel(7, 22, this.white),
      this.pixel(8, 22, this.white),
      this.pixel(9, 22, this.white),
      this.pixel(10, 22, this.white),
      this.pixel(11, 22, this.white),
      this.pixel(12, 22, this.red),
      this.pixel(13, 22, this.red),
      this.pixel(14, 22, this.red),
      this.pixel(15, 22, this.red),
      this.pixel(16, 22, this.white),
      this.pixel(17, 22, this.white),
      this.pixel(18, 22, this.white),
      this.pixel(19, 22, this.white),
      this.pixel(20, 22, this.white),
      this.pixel(21, 22, this.white),
      this.pixel(22, 22, this.white),
      this.pixel(23, 22, this.white),
      this.pixel(24, 22, this.white),
      // row23
      this.pixel(3, 23, this.white),
      this.pixel(4, 23, this.white),
      this.pixel(5, 23, this.white),
      this.pixel(6, 23, this.white),
      this.pixel(7, 23, this.white),
      this.pixel(8, 23, this.white),
      this.pixel(9, 23, this.white),
      this.pixel(10, 23, this.white),
      this.pixel(11, 23, this.white),
      this.pixel(12, 23, this.white),
      this.pixel(13, 23, this.red),
      this.pixel(14, 23, this.red),
      this.pixel(15, 23, this.white),
      this.pixel(16, 23, this.white),
      this.pixel(17, 23, this.white),
      this.pixel(18, 23, this.white),
      this.pixel(19, 23, this.white),
      this.pixel(20, 23, this.white),
      this.pixel(21, 23, this.white),
      this.pixel(22, 23, this.white),
      this.pixel(23, 23, this.white),
      this.pixel(24, 23, this.white),
    ];
  }

  pixelLine(x: number, y: number, color: string) {
    return (
      // .lineColor(this.red)
      new Rect([this.drawLine(x), this.drawLine(y)], this.drawLine()).color(
        color
      ).end
    );
  }

  drawLine(num: number = 1) {
    const pixelSize = 2;
    return pixelSize * num;
  }

  generateLine() {
    var e = [];
    for (let i = 0; i <= 377; i++) {
      e.push(
        this.pixelLine(i, 0, this.white),
        this.pixelLine(i, 1, this.brown),
        this.pixelLine(i, 2, this.white)
      );
    }
    return e;
  }
  generatePdf() {
    const pdf = new PdfMakeWrapper();
    // config global
    pdf.info({
      title: 'Report Activity',
      author: 'Lorem Centro de Investigación e Ipsum en Tecnologías de la Información y dummy',
      subject: 'subject of document',
    }),
    pdf.pageMargins([40, 60, 40, 60]);
    pdf.pageOrientation('landscape');
    // pdf.footer(
    //   new Columns([
    //     new Stack([
    //       'Administrador de Proyectos en STPS',
    //       'Andrés Romero Ramírez '
    //     ])
    //       .alignment('center')
    //       .fontSize(10).end,
    //     new Stack([
    //       new Txt(`Prestador de servicios profesionales`).alignment('center').fontSize(10).end,
    //       new Txt(`Finibus Bonorum et Malorum `).alignment('center').fontSize(10).end
    //     ])
    //       .alignment('center')
    //       .fontSize(10).end,
    //   ])
    //     .columnGap(10)
    //     .bold()
    //     .width(100).end
    // )
    pdf.defaultStyle({
      bold: false,
      fontSize: 10,
    });
    // pdf.styles({
    //   style1: {
    //     bold: true,
    //   },
    //   style2: {
    //     italics: true,
    //   },
    // });
    pdf.pageBreakBefore(
      (
        currentNode,
        followingNodesOnPage,
        nodesOnNextPage,
        previousNodesOnPage
      ) => {
        return (
          currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0
        );
      }
    );
    // content
    pdf.add(
      new Table([
        [
          new Txt(
            `Lorem Centro de Investigación e Ipsum en Tecnologías de la
            Información y dummy`
          )
            .alignment('center')
            .fontSize(12).end,
        ],
      ])
        .layout({
          defaultBorder: false,
        })
        .widths(['*']).end
    );
    pdf.add(
      new Columns([
        new Table([
          [
            new QR('DEV-URTAAV').fit(90).end,
            new Stack([
              'Lorem Ipsum is simply dummy text of the printing',
              'Dirección Adjunta de Administración de Proyectos',
              '         Control de Actividades de: Finibus Bonorum et Malorum',
              'Periodo: Del 01 al 31 de Enero del 2021.',
              'RFC: IPSIMAU950921K74',
            ])
              .alignment('center')
              .fontSize(10)
              .bold().end,
            ''
          ],
        ])
          .layout({
            defaultBorder: false,
          })
          .widths([100, 500,'*']).end,
      ])
        .columnGap(10)
        .bold()
        .width(90).end
    );

    pdf.add(
      new Table([
        [
          new Txt(
            `Fecha vencimiento: ${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`
          )
            .alignment('right')
            .fontSize(10).end,
        ],
      ])
        .heights((rowIndex) => {
          return rowIndex === 0 ? 10 : 0;
        })
        .layout({
          defaultBorder: false,
        })
        .widths(['*']).end
    );

    pdf.add(new Canvas(this.generateLine()).end);

   pdf.add(
    new Columns([
      new Stack([ '', ' ' ]).end
    ]).columnGap(10).end
   )

    pdf.add(
      new Table([
        [
          new Txt('#').alignment('center').bold().fontSize(10).end,
          new Txt('Actividad').alignment('center').bold().fontSize(10).end,
          new Txt('Descripción').alignment('center').bold().fontSize(10).end,
          new Txt('Estado').alignment('center').bold().fontSize(10).end,
          new Txt('% Avance').alignment('center').bold().fontSize(10).end,
        ],
        [
          `1`,
          new Txt(`Donec sollicitudin molestie malesuada. Curabitur aliquet quam id dui posuere blandit.`).alignment('center').fontSize(10).end,
          new Txt(`Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.`).alignment('center').fontSize(10).end,
          new Txt(`Completed`).alignment('center').fontSize(10).color('#16c79a').italics().end,
          new Txt(`100%`).alignment('center').fontSize(10).end,
        ],
        [
          `2`,
          `Lorem ipsum dolor sit amet,  adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `3`,
          `Lorem ipsum sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `4`,
          `Lorem ipsum dolor sit amet, consectetur  elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `5`,
          `Ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh.Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
        [
          `6`,
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          `Sed porttitor lectus nibh. Sed porttitor lectus nibh.`,
          `Completed`,
          `100%`,
        ],
      ])
        .heights((rowIndex) => {
          return rowIndex === 0 ? 13 : 0;
        })
        .layout({
          fillColor: (rowIndex: number, node: any, columnIndex: number) => {
            return rowIndex % 2 === 0 ? '#f2f2f2' : '';
          },
          defaultBorder: false,
        })
        .widths([20, '*', '*', 50, 50]).end
    );
    pdf.add(
      pdf.ln(5)
  );
    pdf.add(
      new Columns([
        new Stack([
          'Administrador de Proyectos en STPS',
          'Andrés Romero Ramírez '
        ])
          .alignment('center')
          .fontSize(10).end,
        new Stack([
          new Txt(`Prestador de servicios profesionales`).alignment('center').fontSize(10).end,
          new Txt(`Finibus Bonorum et Malorum `).alignment('center').fontSize(10).end
        ])
          .alignment('center')
          .fontSize(10).end,
      ])
        .columnGap(10)
        .bold()
        .width(100).end
    )

    pdf.create().open();
  }
}
