# TUF-Control [WIP]
A Keyboard Lighting And Fan Mode Controller 🎛 GUI App For <a href="https://github.com/hackbnw/faustus">hackbnw/faustus</a> Driver Module For ASUS TUF Gaming Series Laptops💻

<img src="https://github.com/icodelifee/TUF-Control/raw/master/images/ss.png"/> 

## How to compile .deb package
<ol>
  <li><code>git clone https://github.com/icodelifee/TUF-Control.git</code></li>
  <li><code>cd TUF-Control/</code></li>
  <li><code>npm install electron-packager -g</code></li>
  <li><code>npm run-script build</code></li>
    <li><code>npm install -g electron-installer-debian</code></li>
  <li><code>electron-installer-debian --src dist/tufcontrol-electron/ --dest dist/installers/ --arch amd64 </code></li>
  <li>Package will be present in dist/installers</li>
</ol>

## How to compile .rpm package
<ol>
  <li><code>git clone https://github.com/icodelifee/TUF-Control.git</code></li>
  <li><code>cd TUF-Control/</code></li>
  <li><code>npm install electron-packager -g</code></li>
  <li><code>npm run-script build</code></li>
  <li><code>npm install -g electron-installer-redhat</code></li>
  <li><code>electron-installer-redhat --src dist/tufcontrol-electron/ --dest dist/installers/ --arch amd64 </code></li>
  <li>Package will be present in dist/installers</li>
</ol>
