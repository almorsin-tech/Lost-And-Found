import { useCallback, useRef, useState } from "react"
import Webcam from "react-webcam";

type Props = {
    image: string | null,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
}

const CameraCapture: React.FunctionComponent<Props> = ({ image, setImage }) => {
    const cameraRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const screenshot = cameraRef.current?.getScreenshot();
        setImage(screenshot || null);
    }, [cameraRef]);

    const clear = useCallback(() => {
        setImage(null);
    }, []);

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                {!image && <>
                    <Webcam
                        audio={false}
                        ref={cameraRef}
                        screenshotFormat="image/jpeg"
                        width={720}
                        height={480}
                    />
                    <br/>
                    <button onClick={capture}>Capture photo</button>
                </>}
                {image && <>
                    <img src={image} alt="Captured" />
                    <br/>
                    <button onClick={clear}>Try again</button>
                </>}

            </div>
        </>
    )

}

export default CameraCapture;