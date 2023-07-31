import React, { useRef } from 'react';
import { StyleSheet, Text } from 'react-native';
import { AlertDialog, Button } from 'native-base';
import { useTheme } from '@react-navigation/native';

interface AlertProps {
	header: string;
	body?: string;
	btnText: string;
	isOpen: boolean;
	setIsOpen: (b: boolean) => void;
	anotherFunc?: () => void;
}

const Alert = ({
	header,
	body,
	btnText,
	isOpen,
	setIsOpen,
	anotherFunc
}: AlertProps) => {
	const theme = useTheme();

	const cancelRef = useRef(null);
	const onClose = () => setIsOpen(false);
	// @ts-ignore

	return (
		<AlertDialog
			leastDestructiveRef={cancelRef}
			isOpen={isOpen}
			onClose={onClose}>
			<AlertDialog.Content>
				<AlertDialog.CloseButton />
				<AlertDialog.Header
					style={{
						backgroundColor: theme.colors.first
					}}>
					<Text
						style={[styles.text, { color: theme.colors.tertiary }]}>
						{header}
					</Text>
				</AlertDialog.Header>
				{body && (
					<AlertDialog.Body
						style={{ backgroundColor: theme.colors.first }}>
						<Text
							style={[
								styles.text,
								{
									color: theme.colors.tertiary,
									fontSize: 14
								}
							]}>
							{body}
						</Text>
					</AlertDialog.Body>
				)}
				<AlertDialog.Footer
					style={{ backgroundColor: theme.colors.first }}>
					<Button.Group space={2}>
						<Button
							variant='unstyled'
							colorScheme='coolGray'
							onPress={onClose}
							ref={cancelRef}>
							<Text
								style={[
									styles.text,
									{
										color: theme.colors.tertiary,
										fontSize: 14
									}
								]}>
								Отменить
							</Text>
						</Button>
						<Button
							colorScheme='danger'
							onPress={() => {
								anotherFunc();
								onClose();
							}}>
							<Text
								style={[
									styles.text,
									{
										color: theme.colors.secondary,
										fontSize: 14
									}
								]}>
								{btnText}
							</Text>
						</Button>
					</Button.Group>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 15,
		lineHeight: 20
	}
});

export default Alert;
