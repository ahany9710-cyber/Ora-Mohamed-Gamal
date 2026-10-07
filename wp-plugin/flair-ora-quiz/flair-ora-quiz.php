<?php
/**
 * Plugin Name: Flair Ora Quiz
 * Description: Game-style lead page for Ora projects (Solana, ZED, Silversands). Use the shortcode [flair_ora_quiz] on any page.
 * Version: 2.3.0
 * Author: Flair Agency
 * Text Domain: flair-ora-quiz
 */

if (!defined('ABSPATH')) {
    exit;
}

define('FOQ_VERSION', '2.3.0');
define('FOQ_URL', plugin_dir_url(__FILE__));

function foq_register_assets() {
    wp_register_style(
        'foq-fonts',
        'https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600&display=swap',
        array(),
        null
    );
    wp_register_style('foq-style', FOQ_URL . 'assets/style.css', array('foq-fonts'), FOQ_VERSION);
    wp_register_script('foq-projects', FOQ_URL . 'assets/projects.js', array(), FOQ_VERSION, true);
    wp_register_script('foq-countries', FOQ_URL . 'assets/countries.js', array(), FOQ_VERSION, true);
    wp_register_script('foq-app', FOQ_URL . 'assets/app.js', array('foq-projects', 'foq-countries'), FOQ_VERSION, true);
}
add_action('wp_enqueue_scripts', 'foq_register_assets');

function foq_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'whatsapp'   => '201063330224',
            'phone'      => '+201063330224',
            'formspree'  => 'xzeddbwr',
            'fullwidth'  => '1',
        ),
        $atts,
        'flair_ora_quiz'
    );

    wp_enqueue_style('foq-style');
    wp_enqueue_script('foq-projects');
    wp_enqueue_script('foq-app');
    wp_localize_script('foq-app', 'FOQ_CONFIG', array(
        'assetsUrl'  => FOQ_URL . 'assets/',
        'whatsapp'   => preg_replace('/\D/', '', $atts['whatsapp']),
        'phone'      => $atts['phone'],
        'formspree'  => $atts['formspree'],
    ));

    $classes = 'foq-root' . ($atts['fullwidth'] === '1' ? ' foq-fullwidth' : '');

    return '<div id="foq-app" class="' . esc_attr($classes) . '" dir="rtl" lang="ar">'
        . '<noscript><p style="padding:24px;text-align:center">'
        . 'من فضلك فعّل JavaScript أو تواصل معنا على واتساب: '
        . '<a href="https://wa.me/' . esc_attr(preg_replace('/\D/', '', $atts['whatsapp'])) . '">WhatsApp</a>'
        . '</p></noscript></div>';
}
add_shortcode('flair_ora_quiz', 'foq_shortcode');
