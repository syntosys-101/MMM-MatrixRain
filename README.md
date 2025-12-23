# MMM-MatrixRain

A MagicMirror² module that displays a fullscreen Matrix-style digital rain animation as a background layer behind all your other modules.

## Installation

### 1. Copy the module

```bash
cd ~/MagicMirror/modules
# Copy or clone MMM-MatrixRain folder here
```

### 2. Install the Matrix Code NFI font

1. Download from: https://www.dafont.com/matrix-code-nfi.font
2. Extract and copy `matrix code nfi.ttf` to the fonts folder:
   ```bash
   mkdir -p ~/MagicMirror/modules/MMM-MatrixRain/fonts
   cp "matrix code nfi.ttf" ~/MagicMirror/modules/MMM-MatrixRain/fonts/
   ```

### 3. Add to config.js

Add this to your `modules` array in `config/config.js`:

```javascript
{
    module: "MMM-MatrixRain",
    position: "fullscreen_below",
    config: {}
}
```

That's it! The rain will fill your entire screen as a background.

## Configuration Options

All options are optional with sensible defaults:

```javascript
{
      module: "MMM-MatrixRain",
      position: "fullscreen_below",
      config: {
        fontSize: 22,
        color: "#009900ff",
        speed: 20,
        density: 0.97,
        trailLength: 0.04,
        rotated: true,
        useMatrixFont: true,
        brightness: 0.4,
        charset: "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
},
```

## Examples

### Subtle Background
```javascript
config: {
    fontSize: 16,
    color: "#004400",
    speed: 70,
    trailLength: 0.03
}
```

### Intense Rain
```javascript
config: {
    fontSize: 22,
    color: "#00ff00",
    speed: 35,
    density: 0.98,
    trailLength: 0.08
}
```

### Cyberpunk Blue
```javascript
config: {
    color: "#00ffff"
}
```

### Binary Only
```javascript
config: {
    charset: "01",
    useMatrixFont: false
}
```

## Troubleshooting

**Font not showing:** Ensure `matrix code nfi.ttf` is in the `fonts/` folder. Set `useMatrixFont: false` as fallback.

**Animation choppy:** Increase `speed` value or decrease `fontSize`.

**Rain not filling the whole screen:** Add this to your `css/custom.css` file in your MagicMirror folder:

```css
.region.fullscreen_below {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-width: none !important;
    max-height: none !important;
    overflow: visible !important;
}

.MMM-MatrixRain,
.MMM-MatrixRain .module-content,
.matrix-rain-wrapper {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-width: none !important;
    max-height: none !important;
    overflow: visible !important;
}
```

**Still having issues?** Check the browser console (F12) for the actual canvas dimensions - look for "MMM-MatrixRain initialized at: WxH" in the logs.

##Attribution

Was looking for this for a awhile and found https://github.com/shin10/MMM-FF-digital-rain it didn't work s i loosly based this around it.

## License

MIT
