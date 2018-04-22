import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
    selector: 'page-show-map',
    templateUrl: 'show-map.html'
})

export class ShowMapPage {
    public location: string = '';

    constructor(private navParams: NavParams, private viewCtrl: ViewController) {
        this.location = this.navParams.get('location');
    }

    ionViewDidLoad() {
        var html = '<iframe style="heigth: 90vh; width: "100%" heigth="99% frameborder="0" style="border: 0" scr="https://image.maps.cit.api.here.com/mia/1.6/mapview?app_id=FUm5HRegJYBKaCiWRGJJ&app_code=OG6TRnyuHrWXnrKQsct7aQ&c=' + this.location + '&maxhits=1" allowFullscreen></iframe>';
        document.getElementById('map').innerHTML = html;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}