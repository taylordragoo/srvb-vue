import invariant from 'invariant';
import {el} from '@elemaudio/core';

export default function s4d(sliderValue) {
    let t = el.train(0.25);
   
    // Our left and right channel sample playback
    let sl = el.sample({path: '96_Gm_MelodicSynth_01_592.wav:0'}, t);
    let sr = el.sample({path: '96_Gm_MelodicSynth_01_592.wav:1'}, t);
   
    // Here we construct a piecewise waveshaper function with:
    //   f(x), x >= 0 : tanh(x)
    //   f(x), x <  0 : tanh(sinh(x)) - 0.2 * x * sin(pi * x)
    let table = (new Float32Array(513)).fill(0);
   
    for (let i = 0; i < 256; ++i) {
      let leftX = (256 - i) / -256;
      let rightX = i / 256;
   
      table[257 + i] = Math.tanh(rightX);
      table[i] = Math.tanh(Math.sinh(leftX)) - 0.3 * leftX * Math.sin(Math.PI * leftX * 2);
    }
   
    // Update our virtual file system. Typically you would do this only once ahead of time,
    // but for the sake of our example we'll do it here
    core.updateVirtualFileSystem({
      '/waveshaper/asym1': table,
    });
   
    // Our pre-distortion left and right channels. We drive the dry signals so that they'll
    // hit the nonlinear parts of our curve. We pre-filter with a subtle lowpass, and we sweep
    // a slow DC offset (bias) to push the signal into different regions of the wave shaper.
    let dl = el.add(el.mul(0.1, el.cycle(1)), el.mul(10, el.smooth(0.6, sl)));
    let dr = el.add(el.mul(0.1, el.cycle(1)), el.mul(10, el.smooth(0.6, sr)));
   
    // Now we map our signal through the waveshaping table to derive our wet signals. We
    // use a DC blocker to remove any lingering DC component, then gain down to a reasonable
    // volume
    let wl = el.mul(0.2, el.dcblock(el.table({path: '/waveshaper/asym1'}, el.mul(0.5, el.add(1, dl)))));
    let wr = el.mul(0.2, el.dcblock(el.table({path: '/waveshaper/asym1'}, el.mul(0.5, el.add(1, dr)))));
   
    let vs = el.sm(el.const({key: 'ex3:mix', value: sliderValue}));
   
    core.render(
      el.scope(el.select(vs, wl, sl)),
      el.select(vs, wr, sr),
    );

    
  }