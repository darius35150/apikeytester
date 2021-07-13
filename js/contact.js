/*******************************************************************************
****Program Title:   Google Maps Test                                          *
****Company:         Holley Software, Inc.                                     *
****Document Name:   animation.js                                              *
****Author:          Darius Holley                                             *
****Date Deployed:   November 18, 2018                                         *
****Department:      Any                                                       *
****Description:     This file is for the emailing suggestions                 *
****                                                                           *
********************************************************************************
*/


const testEmail = () =>
{

    emailjs.init("user_GZFOFVBVqyLQn7siRZzIj");


    sendEmail();
}

const sendEmail = () =>
{
    document.getElementById('contact_form').addEventListener('submit', function(event) {
        
        event.preventDefault();
  
        emailjs.sendForm('service_bkuthgq', 'contact_form', this).then(

            response = (response) =>
            {
                window.alert("Send email successful");
                location.reload();
            },

            error = (error) =>
            {
                window.alert("Send email unsuccessful..." + error);
            }
        );
    });
}