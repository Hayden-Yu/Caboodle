import { environment } from './../../../environments/environment';
// tslint:disable-next-line:max-line-length
import { Directive, Input, OnInit, ElementRef, Inject, PLATFORM_ID, OnDestroy, NgZone, Injector, OnChanges, SimpleChanges, forwardRef, HostListener, HostBinding } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

export interface CaptchaOption {
  theme?: 'dark' | 'light';
  type?: 'audio' | 'image';
  size?: 'compact' | 'normal';
  tabindex?: number;
}

@Directive({
  selector: '[appCaptcha]',
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CaptchaDirective),
  }],
})
export class CaptchaDirective implements OnInit, ControlValueAccessor, OnChanges {
  @HostBinding('style.overflow')
  hostOverflow = 'hidden';

  @Input() captchaOptions: CaptchaOption = {};
  private widgetId: string;
  private onChange: ( value: string ) => void;
  private onTouched: ( value: string ) => void;

  private control: FormControl;
  constructor(private element: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector,
    private zone: NgZone) {
  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.registerScriptLoad();
    this.loadScript();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isPlatformBrowser(this.platformId) && changes.hasOwnProperty('form')) {
      this.control = this.injector.get(NgControl).control;
    }
  }

  loadScript() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad&render=explicit';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  registerScriptLoad() {
    (<any>window).reCaptchaLoad = () => {
      const options = {
        ...this.captchaOptions,
        'sitekey': environment.captchaKey,
        'callback': this.onSuccess.bind(this),
        'expired-callback': this.onExpired.bind(this),
      };
      this.widgetId = (<any>window).grecaptcha.render(this.element.nativeElement, options);
    };
  }

  onExpired() {
    this.zone.run(() => {
      this.onChange('');
      this.writeValue('');
    });
  }

  onSuccess(token: string ) {
    this.zone.run(() => {
      this.onChange(token);
      this.onTouched(token);
      this.writeValue(token);
    });
  }

  writeValue(token: string): void {
    this.element.nativeElement.value = token;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
