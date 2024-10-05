import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AlertDialog, Button } from 'native-base';
import { useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AlertProps {
	header: string;
	body?: string;
	btnText: string;
	anotherBtnText: string;
	isOpen: boolean;
	isClickedEditNote?: boolean;
	bodyNote?: string;
	setBodyNote?: (b: string) => void;
	setIsOpen: (b: boolean) => void;
	setIsClickedEditNote?: (b: boolean) => void;
	mainFunc?: () => void;
	anotherFunc?: () => void;
	getNotes?: () => void;
}

const AlertNotes = ({
	header,
	body,
	btnText,
	anotherBtnText,
	isOpen,
	isClickedEditNote,
	bodyNote,
	setBodyNote,
	setIsOpen,
	setIsClickedEditNote,
	mainFunc,
	anotherFunc,
	getNotes
}: AlertProps) => {
	const theme = useTheme();

	const cancelRef = useRef(null);
	const onClose = () => setIsOpen(false);

	return (
		<AlertDialog
			leastDestructiveRef={cancelRef}
			isOpen={isOpen}
			onClose={() => {
				setIsClickedEditNote(false);
				onClose();
				setBodyNote('');
			}}>
			<AlertDialog.Content>
				<AlertDialog.CloseButton />
				<AlertDialog.Header
					style={{
						backgroundColor: theme.colors.first
					}}>
					<Text style={[styles.text, { color: theme.colors.tertiary }]}>
						{header}
					</Text>
				</AlertDialog.Header>
				{body && !isClickedEditNote ? (
					<AlertDialog.Body style={{ backgroundColor: theme.colors.first }}>
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
				) : null}
				{isClickedEditNote && (
					<AlertDialog.Body style={{ backgroundColor: theme.colors.first }}>
						<TextInput
							style={styles.input}
							placeholder={body}
							value={bodyNote}
							onChangeText={(text) => setBodyNote(text)}
						/>
					</AlertDialog.Body>
				)}
				<AlertDialog.Footer style={{ backgroundColor: theme.colors.first }}>
					<View
						style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							width: '100%'
						}}>
						{!isClickedEditNote ? (
							<>
								<Button
									variant='solid'
									colorScheme='yellow'
									onPress={() => {
										setIsClickedEditNote(!isClickedEditNote);
									}}
									leftIcon={<Feather name='edit' size={20} color={'white'} />}>
									<Text
										style={[
											styles.text,
											{
												color: theme.colors.secondary,
												fontSize: 14
											}
										]}>
										{anotherBtnText}
									</Text>
								</Button>
								<Button
									colorScheme='danger'
									onPress={() => {
										mainFunc();
										onClose();
									}}
									leftIcon={
										<MaterialCommunityIcons
											name='delete-outline'
											size={20}
											color={'white'}
										/>
									}>
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
							</>
						) : (
							<>
								<Button
									variant='solid'
									colorScheme='yellow'
									onPress={() => {
										setIsClickedEditNote(!isClickedEditNote);
										setBodyNote('');
									}}
									leftIcon={
										<Feather name='chevron-left' size={20} color={'white'} />
									}>
									<Text
										style={[
											styles.text,
											{
												color: theme.colors.secondary,
												fontSize: 14
											}
										]}>
										Назад
									</Text>
								</Button>
								<Button
									colorScheme='green'
									variant='solid'
									onPress={() => {
										anotherFunc();
										onClose();
										setIsClickedEditNote(false);
										setBodyNote('');
									}}
									leftIcon={<Feather name='edit' size={20} color={'white'} />}>
									<Text
										style={[
											styles.text,
											{
												color: theme.colors.secondary,
												fontSize: 14
											}
										]}>
										Изменить
									</Text>
								</Button>
							</>
						)}
					</View>
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
	},
	input: {
		borderWidth: 1,
		borderRadius: 16,
		borderColor: 'rgba(60, 60, 67, 0.13)',
		backgroundColor: '#eeeeee',
		padding: 10,
		fontSize: 14,
		lineHeight: 24,
		color: 'rgba(60, 60, 67, 0.6)',
		fontFamily: 'Montserrat-Medium',
		marginVertical: 10
	}
});

export default AlertNotes;
