// Simple animation utility for Three.js objects
export class SimpleAnimator {
    object: any;
    animationFrame: any;
    constructor(object: any) {
      this.object = object;
      this.animationFrame = null;
    }
  
    // Animate object properties
    to(properties: {}, { duration = 1, repeat = 0, yoyo = false, ease = (t:any) => t }) {
      const startValues:any = {};
      const endValues:any = properties;
      const startTime = performance.now();
      const durationMs = duration * 1000;
  
      Object.keys(endValues).forEach((prop) => {
        startValues[prop] = this.object[prop];
      });
  
      const animate = (time:any) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const easedProgress = ease(progress);
  
        Object.keys(endValues).forEach((prop) => {
          const startValue = startValues[prop];
          const endValue = endValues[prop];
          this.object[prop] = startValue + (endValue - startValue) * easedProgress;
        });
  
        if (elapsed < durationMs) {
          this.animationFrame = requestAnimationFrame(animate);
        } else if (repeat > 0) {
          if (yoyo) {
            this.to(startValues, { duration, repeat: repeat - 1, yoyo, ease });
          } else {
            this.to(endValues, { duration, repeat: repeat - 1, yoyo, ease });
          }
        }
      };
  
      this.animationFrame = requestAnimationFrame(animate);
    }
  
    // Stop the current animation
    stop() {
      cancelAnimationFrame(this.animationFrame);
    }
  }
  

//js equivalent

// Simple animation utility for Three.js objects
// export class SimpleAnimator {
//     constructor(object) {
//       this.object = object;
//       this.animationFrame = null;
//     }
  
//     // Animate object properties
//     to(properties, { duration = 1, repeat = 0, yoyo = false, ease = (t) => t }) {
//       const startValues = {};
//       const endValues = properties;
//       const startTime = performance.now();
//       const durationMs = duration * 1000;
  
//       Object.keys(endValues).forEach((prop) => {
//         startValues[prop] = this.object[prop];
//       });
  
//       const animate = (time) => {
//         const elapsed = time - startTime;
//         const progress = Math.min(elapsed / durationMs, 1);
//         const easedProgress = ease(progress);
  
//         Object.keys(endValues).forEach((prop) => {
//           const startValue = startValues[prop];
//           const endValue = endValues[prop];
//           this.object[prop] = startValue + (endValue - startValue) * easedProgress;
//         });
  
//         if (elapsed < durationMs) {
//           this.animationFrame = requestAnimationFrame(animate);
//         } else if (repeat > 0) {
//           if (yoyo) {
//             this.to(startValues, { duration, repeat: repeat - 1, yoyo, ease });
//           } else {
//             this.to(endValues, { duration, repeat: repeat - 1, yoyo, ease });
//           }
//         }
//       };
  
//       this.animationFrame = requestAnimationFrame(animate);
//     }
  
//     // Stop the current animation
//     stop() {
//       cancelAnimationFrame(this.animationFrame);
//     }
//   }
  