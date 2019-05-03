/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var audioContext = null;
var meter = null;
var canvasContext = null;
var canvasContext2 = null;
var WIDTH = 500;
var HEIGHT = 50;
var rafID = null;
let socket = undefined;

window.onload = function () {
    let volumesRoot = document.getElementById('volumes');

    let volumes = {};

    socket = io();
    socket.on('all_volume', function (v) {
        // canvasContext2.clearRect(0, 0, WIDTH, HEIGHT);
        // canvasContext2.fillRect(0, 0, v.volume * WIDTH * 1.4, HEIGHT);
        if (v.name) {
            if (!volumes[v.name]) {
                console.log('init', v.name)
                // let canv = document.createElement('volume_' + v.name);
                let titleDiv = document.createElement('DIV');
                titleDiv.innerText = v.name;
                let volDiv = document.createElement('DIV');
                let canv = document.createElement('CANVAS');
                volDiv.appendChild(titleDiv);
                volDiv.appendChild(canv);
                volumesRoot.appendChild(volDiv);
                volumes[v.name] = canv.getContext("2d");
            }

            volumes[v.name].clearRect(0, 0, WIDTH, HEIGHT);
            volumes[v.name].fillRect(0, 0, v.volume * WIDTH * 1.4, HEIGHT);
        }
    });
}