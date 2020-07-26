import React from 'react';
import TrackPlayer, { usePlaybackState, STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useHasQueue } from 'utility/useQueue';
import ForwardIcon from 'assets/forwards.svg';
import BackwardIcon from 'assets/backwards.svg';
import PlayIcon from 'assets/play.svg';
import PauseIcon from 'assets/pause.svg';
import { useColorScheme } from 'react-native-appearance';

const BUTTON_SIZE = 40;

const pause = () => TrackPlayer.pause();
const play = () => TrackPlayer.play();
const next = () => TrackPlayer.skipToNext();
const previous = () => TrackPlayer.skipToPrevious();

const Container = styled.View`
    align-items: center;
    margin: 20px 0;
`;

const Buttons = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const Button = styled.View`
    margin: 20px 40px;
`;

export default function MediaControls() {
    const scheme = useColorScheme();
    const fill = scheme === 'dark' ? '#ffffff' : '#000000';

    return (
        <Container>
            <Buttons>
                <Button>
                    <PreviousButton fill={fill} />
                </Button>
                <MainButton fill={fill} />
                <Button>
                    <NextButton fill={fill} />
                </Button>
            </Buttons>
        </Container>
    );
}

export function PreviousButton({ fill }: { fill: string }) {
    const hasQueue = useHasQueue();

    return (
        <TouchableOpacity onPress={previous} disabled={!hasQueue} style={{ opacity: hasQueue ? 1 : 0.5 }}>
            <BackwardIcon width={BUTTON_SIZE} height={BUTTON_SIZE} fill={fill} />
        </TouchableOpacity>
    );
}

export function NextButton({ fill }: { fill: string }) {
    const hasQueue = useHasQueue();

    return (
        <TouchableOpacity onPress={next} disabled={!hasQueue} style={{ opacity: hasQueue ? 1 : 0.5 }}>
            <ForwardIcon width={BUTTON_SIZE} height={BUTTON_SIZE} fill={fill} />
        </TouchableOpacity>
    );
}

export function MainButton({ fill }: { fill: string }) {
    const state = usePlaybackState();

    switch (state) {
        case STATE_PLAYING:
            return (
                <TouchableOpacity onPress={pause}>
                    <PauseIcon width={BUTTON_SIZE} height={BUTTON_SIZE} fill={fill} />
                </TouchableOpacity>
            );
        case STATE_PAUSED:
            return (
                <TouchableOpacity onPress={play}>
                    <PlayIcon width={BUTTON_SIZE} height={BUTTON_SIZE} fill={fill} />
                </TouchableOpacity>
            );
        default:
            return (
                <TouchableOpacity onPress={pause} disabled>
                    <PauseIcon width={BUTTON_SIZE} height={BUTTON_SIZE} fill={fill} />
                </TouchableOpacity>
            );
    }
}