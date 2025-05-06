import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import { ClientEvent } from "@/App";

const WaveSurferRecorder: React.FC = ({
  dataChannel,
  audioElement,
  isSessionActive,
}) => {
  const micRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLParagraphElement>(null);
  const recordingsRef = useRef<HTMLDivElement>(null);

  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [record, setRecord] = useState<any>(null);
  const [scrollingWaveform, setScrollingWaveform] = useState(true);
  const [continuousWaveform, setContinuousWaveform] = useState(false);
  const [pauseVisible, setPauseVisible] = useState(false);
  const [progress, setProgress] = useState("00:00");

  const recButtonRef = useRef<HTMLButtonElement>(null);
  const pauseButtonRef = useRef<HTMLButtonElement>(null);
  const micSelectRef = useRef<HTMLSelectElement>(null);

  const createWaveSurfer = async () => {
    if (wavesurfer) wavesurfer.destroy();

    const ws = WaveSurfer.create({
      container: micRef.current!,
      waveColor: "rgb(32, 134, 55)",
      progressColor: "rgb(32, 134, 55)",
    });

    const rec = ws.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        scrollingWaveform,
        continuousWaveform,
        continuousWaveformDuration: 30,
      })
    );

    rec.on("record-end", (blob: Blob) => {
      const container = recordingsRef.current!;
      const recordedUrl = URL.createObjectURL(blob);

      const playback = WaveSurfer.create({
        container,
        waveColor: "rgb(32, 134, 55)",
        progressColor: "rgb(32, 134, 55)",
        url: recordedUrl,
      });

      const button = document.createElement("button");
      button.textContent = "Play";
      button.onclick = () => playback.playPause();
      playback.on("pause", () => (button.textContent = "Play"));
      playback.on("play", () => (button.textContent = "Pause"));
      container.appendChild(button);

      const link = document.createElement("a");
      Object.assign(link, {
        href: recordedUrl,
        download: `recording.${
          blob.type.split(";")[0].split("/")[1] || "webm"
        }`,
        textContent: "Download recording",
      });
      container.appendChild(link);

      setPauseVisible(false);
    });

    rec.on("record-progress", (time: number) => {
      const formatted = [
        Math.floor((time % 3600000) / 60000),
        Math.floor((time % 60000) / 1000),
      ]
        .map((v) => (v < 10 ? "0" + v : v))
        .join(":");
      setProgress(formatted);
    });

    setWavesurfer(ws);
    setRecord(rec);

    // // Populate microphone options
    // const devices = await RecordPlugin.getAvailableAudioDevices();
    // const select = micSelectRef.current!;
    // select.innerHTML = "<option hidden>Select mic</option>";
    // devices.forEach((device) => {
    //   const option = document.createElement("option");
    //   option.value = device.deviceId;
    //   option.text = device.label || device.deviceId;
    //   select.appendChild(option);
    // });
  };

  useEffect(() => {
    createWaveSurfer();
  }, [scrollingWaveform, continuousWaveform]);

  const toggleRecording = async () => {
    if (!record) return;

    if (record.isRecording() || record.isPaused()) {
      record.stopRecording();
    } else {
      const deviceId = micSelectRef.current?.value;
      await record.startRecording({ deviceId });
      setPauseVisible(true);
    }
  };

  const togglePause = () => {
    if (!record) return;

    if (record.isPaused()) {
      record.resumeRecording();
    } else {
      record.pauseRecording();
    }
  };

  useEffect(() => {
    toggleRecording();
  }, [isSessionActive, recButtonRef]);

  return (
    <div>
      <h1>🎙️ Your Voice</h1>
      {/* 
      <button ref={recButtonRef} onClick={toggleRecording}>
        Record
      </button>
      {pauseVisible && (
        <button ref={pauseButtonRef} onClick={togglePause}>
          Pause
        </button>
      )} */}

      {/* <select ref={micSelectRef}>
        <option value="">Select mic</option>
      </select> */}

      {/* <label>
        <input
          type="checkbox"
          checked={scrollingWaveform}
          onChange={(e) => {
            setScrollingWaveform(e.target.checked);
            if (e.target.checked) setContinuousWaveform(false);
          }}
        />
        Scrolling waveform
      </label>

      <label>
        <input
          type="checkbox"
          checked={continuousWaveform}
          onChange={(e) => {
            setContinuousWaveform(e.target.checked);
            if (e.target.checked) setScrollingWaveform(false);
          }}
        />
        Continuous waveform
      </label> */}

      <p ref={progressRef}>{progress}</p>

      <div
        ref={micRef}
        style={{
          border: "1px solid #ddd",
          borderRadius: "40px",
          marginTop: "1rem",
        }}
      />

      {/* for recordings */}

      <div
        className="hidden"
        ref={recordingsRef}
        style={{ margin: "1rem 0" }}
      />
    </div>
  );
};

export default WaveSurferRecorder;
