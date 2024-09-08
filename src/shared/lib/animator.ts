export class AnimationManager {
    private static instance: AnimationManager | null = null;
    private animators: SimpleAnimator[] = [];
  
    private constructor() {
      if (!AnimationManager.instance) {
        AnimationManager.instance = this;
        this.startLoop();
      }
      return AnimationManager.instance;
    }
  
    public static getInstance(): AnimationManager {
      if (!AnimationManager.instance) {
        AnimationManager.instance = new AnimationManager();
      }
      return AnimationManager.instance;
    }
  
    public add(animator: SimpleAnimator): void {
      this.animators.push(animator);
    }
  
    public remove(animator: SimpleAnimator): void {
      this.animators = this.animators.filter((a) => a !== animator);
    }
  
    private startLoop(): void {
      const loop = () => {
        const now = performance.now();
        this.animators.forEach((animator) => animator.update(now));
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }

  interface AnimationOptions {
    duration?: number;
    repeat?: number;
    yoyo?: boolean;
    ease?: (t: number) => number;
    onComplete?: () => void;
  }
  
  export class SimpleAnimator {
    private object: any;
    private startValues: Record<string, number> = {};
    private endValues: Record<string, number> = {};
    private startTime: number = 0;
    private duration: number = 1000;
    private easing: (t: number) => number = (t) => t;
    private repeat: number = 0;
    private yoyo: boolean = false;
    private active: boolean = false;
    private onComplete: (() => void) | null = null;
  
    constructor(object: any) {
      this.object = object;
      AnimationManager.getInstance().add(this); // Register with global manager
    }
  
    public to(properties: Record<string, number>, options: AnimationOptions): void {
      this.startValues = {};
      this.endValues = properties;
      this.startTime = performance.now();
      this.duration = (options.duration ?? 1) * 1000;
      this.easing = options.ease ?? ((t) => t);
      this.repeat = options.repeat ?? 0;
      this.yoyo = options.yoyo ?? false;
      this.active = true;
      this.onComplete = options.onComplete ?? null;
  
      // Capture starting values
      Object.keys(properties).forEach((prop) => {
        this.startValues[prop] = this.object[prop];
      });
    }
  
    public update(time: number): void {
      if (!this.active) return;
  
      const elapsed = time - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const easedProgress = this.easing(progress);
  
      // Interpolate between start and end values
      Object.keys(this.endValues).forEach((prop) => {
        const startValue = this.startValues[prop];
        const endValue = this.endValues[prop];
        this.object[prop] = startValue + (endValue - startValue) * easedProgress;
      });
  
      // If the animation has reached the end of the duration
      if (elapsed >= this.duration) {
        if (this.onComplete) {
          this.onComplete();
        }
        console.log(this.repeat)
        if (this.repeat === -1 || this.repeat > 0) {
            console.log(this.repeat)
          // Handle repeat logic
          if (this.repeat > 0) {
            this.repeat -= 1;
          }
  
          // Yoyo effect: Swap the start and end values for the reverse movement
          if (this.yoyo) {
            [this.startValues, this.endValues] = [this.endValues, this.startValues];
          }
  
          // Reset the start time for the next loop
          this.startTime = performance.now();
        } else {
          this.active = false; // Stop the animation when done
        }
      }
    }
  
    public stop(): void {
      this.active = false;
      AnimationManager.getInstance().remove(this); // Unregister from manager
    }
  }
  



// // AnimationManager handles a single requestAnimationFrame loop for all animators
// export class AnimationManager {
//     static instance = null;
//     animators = [];
  
//     constructor() {
//       if (!AnimationManager.instance) {
//         AnimationManager.instance = this;
//         this.startLoop();
//       }
//       return AnimationManager.instance;
//     }
  
//     add(animator) {
//       this.animators.push(animator);
//     }
  
//     remove(animator) {
//       this.animators = this.animators.filter((a) => a !== animator);
//     }
  
//     startLoop() {
//       const loop = () => {
//         const now = performance.now();
//         this.animators.forEach((animator) => animator.update(now));
//         requestAnimationFrame(loop);
//       };
//       requestAnimationFrame(loop);
//     }
//   }
  
//   export class SimpleAnimator {
//     constructor(object) {
//       this.object = object;
//       this.startValues = {};
//       this.endValues = {};
//       this.startTime = 0;
//       this.duration = 1000;
//       this.easing = (t) => t;
//       this.repeat = 0|object.repeat;
//       this.yoyo = false;
//       this.active = false;
//       this.onComplete = null; // Callback function to execute on completion
//       AnimationManager.instance.add(this); // Register with global manager
//     }
  
//     to(properties, { duration = 1, repeat = 0, yoyo = false, ease = (t) => t, onComplete = null }) {
//       this.startValues = {};
//       this.endValues = properties;
//       this.startTime = performance.now();
//       this.duration = duration * 1000;
//       this.easing = ease;
//       this.repeat = repeat;
//       this.yoyo = yoyo;
//       this.active = true;
//       this.onComplete = onComplete; // Set the callback function
  
//       // Capture starting values
//       Object.keys(properties).forEach((prop) => {
//         this.startValues[prop] = this.object[prop];
//       });
//     }
  
//     update(time) {
//       if (!this.active) return;
  
//       const elapsed = time - this.startTime;
//       const progress = Math.min(elapsed / this.duration, 1);
//       const easedProgress = this.easing(progress);
  
//       // Interpolate between start and end values
//       Object.keys(this.endValues).forEach((prop) => {
//         const startValue = this.startValues[prop];
//         const endValue = this.endValues[prop];
//         this.object[prop] = startValue + (endValue - startValue) * easedProgress;
//       });
  
//       // If the animation has reached the end of the duration
//       if (elapsed >= this.duration) {
//         if (this.onComplete) {
//           this.onComplete();
//         }
  
//         if (this.repeat === -1 || this.repeat > 0) {
//           // Handle repeat logic
//           if (this.repeat > 0) {
//             this.repeat -= 1;
//           }
  
//           // Yoyo effect: Swap the start and end values for the reverse movement
//           if (this.yoyo) {
//             [this.startValues, this.endValues] = [this.endValues, this.startValues];
//           }
  
//           // Reset the start time for the next loop
//           this.startTime = performance.now();
//         } else {
//           this.active = false; // Stop the animation when done
//         }
//       }
//     }
  
//     stop() {
//       this.active = false;
//       AnimationManager.instance.remove(this); // Unregister from manager
//     }
//   }
  