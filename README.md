# MMM-MatrixRain

A [MagicMirror²](https://magicmirror.builders/) module that displays a Matrix-style digital rain animation as a fullscreen background.

![Matrix Rain Preview](screenshot.png)

## Features

- Fullscreen falling code animation behind all other modules
- Supports rotated displays (portrait mode)
- Adjustable brightness so overlaid modules remain readable
- Customizable colors, speed, density, and character sets
- Optional Matrix Code NFI font for authentic look

## Installation

### 1. Clone this repository

```bash
cd ~/MagicMirror/modules
git clone https://github.com/syntosys-101/MMM-MatrixRain.git
```

### 2. Install the Matrix Code NFI font (optional but recommended)

1. Download from: https://www.dafont.com/matrix-code-nfi.font
2. Extract and copy the font file:

```bash
mkdir -p ~/MagicMirror/modules/MMM-MatrixRain/fonts
cp "matrix code nfi.ttf" ~/MagicMirror/modules/MMM-MatrixRain/fonts/
```

### 3. Add to your config.js

Add this to your `modules` array in `config/config.js`:

```javascript
{
    module: "MMM-MatrixRain",
    position: "fullscreen_below"
}
```

## Configuration

All options are optional with sensible defaults:

| Option | Description | Default |
|--------|-------------|---------|
| `fontSize` | Character size in pixels | `20` |
| `color` | Rain color (hex) | `"#00ff00"` |
| `speed` | Milliseconds between frames (lower = faster) | `50` |
| `density` | How often new drops spawn (0.90–0.99) | `0.96` |
| `trailLength` | Fade speed (0.02–0.1, lower = longer trails) | `0.05` |
| `brightness` | Character brightness (0.1–1.0) | `0.4` |
| `rotated` | Set to `true` if display is rotated 90° | `false` |
| `width` | Manual width override in pixels | `null` (auto) |
| `height` | Manual height override in pixels | `null` (auto) |
| `useMatrixFont` | Use Matrix Code NFI font | `true` |
| `charset` | Characters to display | Katakana + alphanumeric |

### Example Configuration

```javascript
{
    module: "MMM-MatrixRain",
    position: "fullscreen_below",
    config: {
        fontSize: 22,
        color: "#00ff00",
        speed: 45,
        density: 0.97,
        brightness: 0.3
    }
}
```

### Preset Examples

**Subtle Background**
```javascript
config: {
    brightness: 0.2,
    speed: 70,
    density: 0.94
}
```

**Intense Rain**
```javascript
config: {
    brightness: 0.6,
    speed: 35,
    density: 0.98
}
```

**Cyberpunk Blue**
```javascript
config: {
    color: "#00ffff",
    brightness: 0.4
}
```

**Binary Only**
```javascript
config: {
    charset: "01",
    useMatrixFont: false
}
```

## Rotated Display Support

If your MagicMirror is in portrait mode using CSS rotation like:

```css
body {
    transform: rotate(-90deg);
    transform-origin: top left;
    width: 100vh;
    height: 100vw;
    top: 100vh;
}
```

Set `rotated: true` in your config:

```javascript
{
    module: "MMM-MatrixRain",
    position: "fullscreen_below",
    config: {
        rotated: true,
        brightness: 0.3
    }
}
```

If auto-detection doesn't work, set dimensions manually (swap your screen's width/height):

```javascript
{
    module: "MMM-MatrixRain",
    position: "fullscreen_below",
    config: {
        width: 1080,   // Your screen's height becomes width when rotated
        height: 1920,  // Your screen's width becomes height when rotated
        brightness: 0.3
    }
}
```

## Troubleshooting

**Font not showing**
- Ensure `matrix code nfi.ttf` is in the `fonts/` folder
- Check file permissions: `chmod 644 fonts/matrix\ code\ nfi.ttf`
- Set `useMatrixFont: false` to use system monospace as fallback

**Animation is choppy**
- Increase `speed` value (e.g., 70 or 80)
- Decrease `fontSize` to reduce number of columns

**Rain not covering full screen**
- Check `rotated` setting matches your display orientation
- Use manual `width` and `height` overrides with your screen resolution
- Check browser console for "MMM-MatrixRain canvas size" log message

**Overlaid modules hard to read**
- Decrease `brightness` (try 0.2 or 0.15)

## License

MIT License - Feel free to modify and share!

## Credits

- Matrix Code NFI font by [Norfok Incredible Font Design](https://www.dafont.com/norfok-incredible-font-design.d205)
- Inspired by The Matrix trilogy
