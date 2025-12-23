/* MagicMirror² Module: MMM-MatrixRain
 * Displays Matrix-style falling code animation as fullscreen background
 * Uses Matrix Code NFI font from dafont.com
 */

Module.register("MMM-MatrixRain", {
    defaults: {
        fontSize: 20,
        color: "#00ff00",
        speed: 50,
        density: 0.96,
        charset: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        useMatrixFont: true,
        trailLength: 0.05,
        rotated: true,
        brightness: 0.4  // Character brightness (0.1 = very dim, 1.0 = full brightness)
    },

    getStyles: function() {
        return ["MMM-MatrixRain.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.columns = [];
        this.canvas = null;
        this.ctx = null;
        this.animationRunning = false;
    },

    getDom: function() {
        // Return minimal wrapper - actual canvas is injected into body
        const wrapper = document.createElement("div");
        wrapper.className = "matrix-rain-placeholder";
        wrapper.innerHTML = "<!-- MMM-MatrixRain active -->";

        // Inject canvas directly into body after a delay
        setTimeout(() => {
            this.injectCanvas();
        }, 1500);

        return wrapper;
    },

    injectCanvas: function() {
        // Check if already injected
        if (document.getElementById("matrix-rain-canvas")) {
            return;
        }

        // Create canvas and inject directly into body
        this.canvas = document.createElement("canvas");
        this.canvas.id = "matrix-rain-canvas";
        this.canvas.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: -1000 !important;
            pointer-events: none !important;
            background: #000 !important;
        `;

        // Insert as first child of body
        document.body.insertBefore(this.canvas, document.body.firstChild);

        // Set actual pixel dimensions (not CSS dimensions)
        this.setCanvasSize();

        // Handle resize
        window.addEventListener("resize", () => {
            this.setCanvasSize();
        });

        // Initialize and start animation
        this.initMatrix();
    },

    setCanvasSize: function() {
        if (!this.canvas) return;

        let width, height;

        if (this.config.rotated) {
            // Display is rotated 90 degrees - swap dimensions
            width = window.screen.height || window.innerHeight;
            height = window.screen.width || window.innerWidth;
        } else {
            width = window.screen.width || window.innerWidth;
            height = window.screen.height || window.innerHeight;
        }

        this.canvas.width = width;
        this.canvas.height = height;

        Log.info("MMM-MatrixRain canvas size: " + width + "x" + height + (this.config.rotated ? " (rotated)" : ""));
    },

    initMatrix: function() {
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");

        // Fill with black initially
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const columnCount = Math.floor(this.canvas.width / this.config.fontSize);

        // Initialize drop positions
        this.columns = [];
        for (let i = 0; i < columnCount; i++) {
            // Random start position above screen
            this.columns[i] = Math.floor(Math.random() * -100);
        }

        // Start animation
        if (!this.animationRunning) {
            this.animationRunning = true;
            this.animate();
        }
    },

    animate: function() {
        if (!this.ctx || !this.canvas) return;

        const ctx = this.ctx;
        const config = this.config;
        const canvas = this.canvas;
        const columns = this.columns;
        const charset = config.charset;
        const canvasHeight = canvas.height;
        const fontSize = config.fontSize;
        const brightness = config.brightness;

        // Fade effect - creates the trailing effect
        ctx.fillStyle = `rgba(0, 0, 0, ${config.trailLength})`;
        ctx.fillRect(0, 0, canvas.width, canvasHeight);

        // Set font
        const fontFamily = config.useMatrixFont ? "'Matrix Code NFI', monospace" : "monospace";
        ctx.font = fontSize + "px " + fontFamily;
        ctx.textAlign = "center";

        // Parse the color to RGB for alpha blending
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 255, b: 0 };
        };
        const rgb = hexToRgb(config.color);

        for (let i = 0; i < columns.length; i++) {
            const char = charset[Math.floor(Math.random() * charset.length)];

            const x = i * fontSize + fontSize / 2;
            const y = columns[i] * fontSize;

            // Leading character - bright white/green with brightness applied
            ctx.fillStyle = `rgba(170, 255, 170, ${brightness})`;
            ctx.fillText(char, x, y);

            // Second character - main color with brightness applied
            if (columns[i] > 1) {
                ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${brightness})`;
                const char2 = charset[Math.floor(Math.random() * charset.length)];
                ctx.fillText(char2, x, y - fontSize);
            }

            // Reset when off screen
            if (y > canvasHeight && Math.random() > config.density) {
                columns[i] = Math.floor(Math.random() * -20);
            }

            columns[i]++;
        }

        // Continue animation
        const self = this;
        setTimeout(function() {
            requestAnimationFrame(function() {
                self.animate();
            });
        }, config.speed);
    }
});
