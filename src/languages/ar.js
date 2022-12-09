module.exports = {
  
  general: {
    timeOut: (t) => `> **🙄 - الرجاء الإنتظار ${t} من الثواني!**`,
    noPermissions: (p) => `> **لايمكنك أستخدام هذا الأمر ، بسبب عدم توفر الصلاحيات الاتية لديك [${p}]!**`,
    cmdDm: `> **🙄 يمكنك أستخدم هذا الأمر في الدردشات الخاصة فقط!**`
  },
  
  help: {
    info: {
      description: `لروية جميع الاوامر والإستعلام عن كيفية إستخدام أمر معين.`
    },
    ghTitle: `**قائمة الأوامر**`,
    ghFooter: (p) => `للمزيد من المعلومات حول أمر معين,\nأكتب ${p}help (Command)`,
    ghSections: [
      `**عامة**`,
      `**إدارية**`
    ],
    chTitle: (c) => `**الأمر: ${c}**`,
    chFooter: ``,
    chSections: [
      `**الأختصارات:**`,
      `**الاستخدام:**`,
      `**أمثلة للأمر:**`
    ],
    chNotFound: `> **🙄 - لايمكنني إيجاد هذا الأمر!**`
  },
  
  ping: {
    info: {
      description: `اختبار وقت استجابة البوت.`
    },
    pong: '> **🏓 بونق...**'
  },
  
  setlanguage: {
    info: {
      description: `يضبط لغتك المفضلة على البوت.`
    },
    notFoundLanguage: (l) => `> **🙄 اللغات المدعومة هي __${l}__**`,
    done: `> **✅ تم تغيير اللغة بنجاح!**`
  },
  
  setprefix: {
    info: {
      description: `يضبط البادئة المفضلة لديك على البوت.`
    },
  },

  "send-verification": {
    info: {
      description: `يرسل رساله التفعيل في الروم المحدد من البروجيكت .`
    },
    missingId: "> **🙄 لم يتم تحديد روم النفعيل بعد** ?",
    missingGuildId: "> **🙄 لم يتم تحديد اي دي مجموعه بعد** ?",
    invalidGId: "> **🙄 يبدو ان اي دي المجموعه غير صحيح يرجي تغيره** ?",
    invalidId: "> **يبدو ان معرف الروم المدخل غير صحيح يرجي تغيره 🙄** !",
    done: "> **✅ تم ارسال رساله التفعيل بنجاح**"
  },

  "add-member": {
    info: {
      description: `لاضافه لاعضاء المسجلين.`
    },
  },

  blacklist: {
    info: {
      description: `وضع مجموعه في قائمه البلاك ليست.`
    },
    doneADD: "> **تم اضافه هذه المجموعه بنجاح**",
    missing: "> **لم يتم تسجيل هذا المجموهه بعد**",
    doneREMOVE: "> **تم خذف هذه المجموهه من قائمه البلاك ليست**",
    notmain: "> **لا يمكنك وضع المجموعه الاساسيه في قائمه البلاك ليست**"
  }
  
};