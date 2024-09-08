// AnimationManager handles a single requestAnimationFrame loop for all animators
export class AnimationManager {
    static instance = null;
    animators = [];
  
    constructor() {
      if (!AnimationManager.instance) {
        AnimationManager.instance = this;
        this.startLoop();
      }
      return AnimationManager.instance;
    }
  
    add(animator) {
      this.animators.push(animator);
    }
  
    remove(animator) {
      this.animators = this.animators.filter((a) => a !== animator);
    }
  
    startLoop() {
      const loop = () => {
        const now = performance.now();
        this.animators.forEach((animator) => animator.update(now));
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }
  
  // SimpleAnimator class that now registers with AnimationManager
  export class SimpleAnimator {
    constructor(object) {
      this.object = object;
      this.startValues = {};
      this.endValues = {};
      this.startTime = 0;
      this.duration = 1000;
      this.easing = (t) => t;
      this.repeat = 0;
      this.yoyo = false;
      this.active = false;
      AnimationManager.instance.add(this); // Register with global manager
    }
  
    to(properties, { duration = 1, repeat = 0, yoyo = false, ease = (t) => t }) {
      this.startValues = {};
      this.endValues = properties;
      this.startTime = performance.now();
      this.duration = duration * 1000;
      this.easing = ease;
      this.repeat = repeat;
      this.yoyo = yoyo;
      this.active = true;
  
      Object.keys(properties).forEach((prop) => {
        this.startValues[prop] = this.object[prop];
      });
    }
  
    update(time) {
      if (!this.active) return;
  
      const elapsed = time - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const easedProgress = this.easing(progress);
  
      Object.keys(this.endValues).forEach((prop) => {
        const startValue = this.startValues[prop];
        const endValue = this.endValues[prop];
        this.object[prop] = startValue + (endValue - startValue) * easedProgress;
      });
  
      if (elapsed >= this.duration) {
        if (this.repeat > 0) {
          this.repeat -= 1;
          if (this.yoyo) {
            [this.startValues, this.endValues] = [this.endValues, this.startValues];
          }
          this.startTime = performance.now();
        } else {
          this.active = false; // Stop when animation is done
        }
      }
    }
  
    stop() {
      this.active = false;
      AnimationManager.instance.remove(this); // Unregister from manager
    }
  }
  
  // Initialize AnimationManager once
  new AnimationManager();
  