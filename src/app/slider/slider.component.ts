import { Component, OnInit, AfterContentInit, AfterViewInit, ElementRef } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styles: [
    `
    .swiper-container {
      width: 100%;
      padding-top: 30px;
      padding-bottom: 30px;
      border: 1px solid lightskyblue;
    }

    .swiper-slide {
      text-align: center;
      display: flex;
      flex-direction: column;
    }

    ::ng-deep .active {
      color: #3c3fcb !important;
    }

    ::ng-deep .swiper-slide {
      transform: scale(1);
      transition: transform 0.3s ease-out;
    }

    ::ng-deep .swiper-slide.active {
      transform: scale(1.3);
      transition: transform 0.2s ease-out !important;
    }
      .font-regular {
        font-family: Graphik-Regular, Graphik-Medium, "Helvetica Neue",
          sans-serif !important;
      }
    `
  ]
})
export class SliderComponent implements OnInit {
  Swiper: any;
  elements: any;
  slides = ['BTC', 'LTC', 'ETH', 'EOS', 'IOTA', 'TRON', 'NEO', 'XEM'];
  virtualSlides = [];
  slideIndex: number;
  selectedElement: any;
  startPosition: number;

  portion = [];
  portionReverted = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    Array.prototype.push.apply(this.virtualSlides, this.slides);
    Array.prototype.push.apply(this.virtualSlides, this.slides);
    Array.prototype.push.apply(this.virtualSlides, this.slides);
    Array.prototype.push.apply(this.virtualSlides, this.slides);
    Array.prototype.push.apply(this.virtualSlides, this.slides);

    this.createPortions(this.slides);

    this.Swiper = new Swiper(
      this.elementRef.nativeElement.querySelector('.swiper-container'),
      {
        init: false,
        slidesPerView: 5,
        initialSlide: 16,
        centeredSlides: true
      }
    );

    this.virtualSlides.forEach(elem => {
      this.Swiper.appendSlide(
        '<div class="swiper-slide" style="text-align:center;">' +
          elem +
        '</div>'
      );
    });

    this.Swiper.on('slideChange', () => {
      this.highlight();
    });

    this.Swiper.on('touchStart', () => {
     this.changeSwiper();
    });

    this.Swiper.on('transitionEnd', () => {
      this.highlight();
      this.changeSwiper();
    });

    this.Swiper.on('sliderMove', () => {
      this.changeSwiper();
      this.highlight();
    });

    this.elements = document.getElementsByClassName('swiper-slide');

    this.Swiper.init();
  }

  highlight() {
    const centerX = document.documentElement.clientWidth / 2;
    let prevDist = 10000000;

    [].forEach.call(this.elements, (elem, i) => {
      const slideCoord = (this.getСoordinates(elem).left + this.getСoordinates(elem).right) / 2;
      const distance = Math.abs(+centerX - +slideCoord);
      if (distance < prevDist) {
        prevDist = distance;
        this.slideIndex = i;
        this.selectedElement = elem;
      }
    });

    this.selectedElement.classList.add('active');

    if (this.elements[this.slideIndex + 1]) {
      this.elements[this.slideIndex + 1].classList.remove('active');
    }
    if (this.elements[this.slideIndex - 1]) {
      this.elements[this.slideIndex - 1].classList.remove('active');
    }
    if (this.elements[this.slideIndex + 2]) {
      this.elements[this.slideIndex + 2].classList.remove('active');
    }
    if (this.elements[this.slideIndex - 2]) {
      this.elements[this.slideIndex - 2].classList.remove('active');
    }
    if (this.elements[this.slideIndex + 3]) {
      this.elements[this.slideIndex + 3].classList.remove('active');
    }
    if (this.elements[this.slideIndex - 3]) {
      this.elements[this.slideIndex - 3].classList.remove('active');
    }
    if (this.elements[this.slideIndex + 4]) {
      this.elements[this.slideIndex + 4].classList.remove('active');
    }
    if (this.elements[this.slideIndex - 4]) {
      this.elements[this.slideIndex - 4].classList.remove('active');
    }
  }

  changeSwiper() {
    if (this.Swiper.activeIndex < this.slides.length) {
      this.addLeft();
    }

    if (this.Swiper.activeIndex > this.Swiper.wrapperEl.children.length - this.slides.length) {
      this.addRight();
    }
  }

  addLeft() {
    if (this.Swiper.activeIndex === this.slides.length) {
      this.Swiper.prependSlide(this.portionReverted);
      this.removeRight();
    }
  }

  removeLeft() {
    const remove = [];
    for (let i = 0; i < this.slides.length; i++) {
      remove.push(i);
    }
    this.Swiper.removeSlide(remove);
  }

  removeRight() {
    const remove = [];
    for (let i = this.slides.length * 5 - 1; i >= this.slides.length * 4; i--) {
      remove.unshift(i);
    }
    this.Swiper.removeSlide(remove);
  }

  addRight() {
    if (this.Swiper.activeIndex > this.Swiper.wrapperEl.children.length - this.slides.length) {
      this.Swiper.appendSlide(this.portion);
      this.removeLeft();
    }
  }

  getСoordinates(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      right: box.right + pageXOffset
    };
  }

  createPortions(slides: any) {
    this.portion = [];
    this.portionReverted = [];

    slides.forEach(elem => {
      this.portion.push(
        `<div class="swiper-slide" style="text-align:center; padding-top: 50px;">
        ${elem}
         </div>`);
    });

    Object.assign(this.portionReverted, this.portion);
    this.portionReverted.reverse();
   }


}
