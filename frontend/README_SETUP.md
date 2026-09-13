# Intrinsic Bio-Sensing — Frontend Theme Package

Drop these files into your existing `frontend/` Vite project at the matching
paths (they overwrite `App.tsx`, `main.tsx`, `tailwind.config.js`, and add
new components/pages).

## 1. Install the two extra packages this theme needs
```bash
npm install recharts react-router-dom
```

## 2. Files included
```
tailwind.config.js                  -> replace your existing one
src/styles/index.css                -> replace/point your Vite entry CSS here
src/main.tsx                        -> replace
src/App.tsx                         -> replace (wire your real pages back in
                                        as you rebuild Login/Dashboard auth flow)
src/components/Sidebar.tsx
src/components/Layout.tsx
src/components/TreeSignalVisual.tsx  <- the signature glowing tree
src/components/BioSignalWaveform.tsx
src/components/CircularGauge.tsx
src/components/HealthIndexRing.tsx
src/components/LiveSignalChart.tsx
src/components/AlertsPanel.tsx
src/components/DeviceStatusPanel.tsx
src/components/FrequencyAnalysis.tsx
src/components/AIInterpretationCard.tsx
src/components/DataFlowDiagram.tsx
src/components/DashboardHero.tsx
src/components/MetricCards.tsx
src/components/TreeHealthCard.tsx
src/pages/Dashboard.tsx
```

## 3. If index.css was imported elsewhere
Make sure your old `main.tsx` or `index.css` import path doesn't conflict —
this package expects the Tailwind entry file at `src/styles/index.css`.
If your project currently has `src/index.css`, either delete it or update
the import in `main.tsx` to match your actual path.

## 4. Re-wire your auth/login flow
`App.tsx` here is intentionally minimal (no login gate) so you can preview
the whole theme immediately. Once you're happy with the look, merge your
existing `ProtectedRoute` / `Login` page back in around the `<Layout />`
route the same way you had it before.

## 5. Run it
```bash
npm run dev
```

## Notes on the signature tree animation
`TreeSignalVisual.tsx` is pure SVG + native `<animateMotion>` — no extra
libraries needed. Pulses travel root → trunk → branch on staggered timers,
and the trunk pulse's rhythm matches the waveform drawn at the bottom of
the same visual, so the "tree becomes a waveform" feel reads naturally.
All motion is slow (3.5–6.5s loops) per the brief — nothing shakes or flashes.
