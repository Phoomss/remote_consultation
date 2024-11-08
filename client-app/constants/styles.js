import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#69AFEF',
    },
    header: {
        fontSize: 32,
        fontWeight: '700',
        color: '#ffff',
        marginTop: 75,
        marginBottom: 75
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
        marginTop: 75,
        marginBottom: 75,
        width: 340,
        justifyContent: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    servicesContainer: {
        backgroundColor: '#ffffff',
        borderTopRightRadius: 75,
        borderTopLeftRadius: 75,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 30,
        flex: 1
    },
    servicesTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        fontWeight: '700',
    },
    serviceButton: {
        backgroundColor: 'rgba(40, 140, 232, 0.7)',
        height: 55,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 75,
        marginVertical: 8,
        width: '80%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    serviceButtonTwo: {
        backgroundColor: "rgba(40, 140, 232, 0.4)",
        height: 55,
        width: 296,
        borderRadius: 75,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginVertical: 8,
        width: '80%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonTextTwo: {
        color: 'rgba(54, 97, 137, 1)',
        fontSize: 18,
        fontWeight: '700',
    },
    logout: {
        backgroundColor: '#A09D9D',
        height: 55,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 75,
        marginVertical: 8,
        width: '80%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    logoutText: {
        fontSize: 20,
        color: "#ffff",
        fontWeight: "600",
        alignItems: 'center',
    }

})

export const AuthStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#69AFEF', // Background color for the screen
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        // color: '#fff',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 75,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
        elevation: 20,
        shadowColor: '#007df0',
    },
    button: {
        backgroundColor: '#40a8d4',
        paddingVertical: 15,
        borderRadius: 75,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    signUpText: {
        fontSize: 14,
        color: '#333',
        marginTop: 20
    },
    signUpLink: {
        color: '#007bff',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export const ProfileStyle = StyleSheet.create({
    profileImage: {
        height: 120,
        width: 120,

    },
    btnEdit: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        color: "black"
    }
})
