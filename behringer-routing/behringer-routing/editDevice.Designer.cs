namespace behringer_routing
{
    partial class editDevice
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.comboBoxType = new System.Windows.Forms.ComboBox();
            this.comboBoxConnection = new System.Windows.Forms.ComboBox();
            this.buttonCancel = new System.Windows.Forms.Button();
            this.buttonOK = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 15);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(68, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "Device Type";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 47);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(61, 13);
            this.label2.TabIndex = 0;
            this.label2.Text = "Connection";
            // 
            // comboBoxType
            // 
            this.comboBoxType.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.comboBoxType.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.comboBoxType.FormattingEnabled = true;
            this.comboBoxType.Location = new System.Drawing.Point(86, 12);
            this.comboBoxType.Name = "comboBoxType";
            this.comboBoxType.Size = new System.Drawing.Size(121, 21);
            this.comboBoxType.Sorted = true;
            this.comboBoxType.TabIndex = 1;
            // 
            // comboBoxConnection
            // 
            this.comboBoxConnection.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.comboBoxConnection.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.comboBoxConnection.FormattingEnabled = true;
            this.comboBoxConnection.Location = new System.Drawing.Point(86, 44);
            this.comboBoxConnection.Name = "comboBoxConnection";
            this.comboBoxConnection.Size = new System.Drawing.Size(121, 21);
            this.comboBoxConnection.Sorted = true;
            this.comboBoxConnection.TabIndex = 1;
            // 
            // buttonCancel
            // 
            this.buttonCancel.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.buttonCancel.ForeColor = System.Drawing.SystemColors.WindowText;
            this.buttonCancel.Location = new System.Drawing.Point(13, 90);
            this.buttonCancel.Name = "buttonCancel";
            this.buttonCancel.Size = new System.Drawing.Size(75, 23);
            this.buttonCancel.TabIndex = 2;
            this.buttonCancel.Text = "Cancel";
            this.buttonCancel.UseVisualStyleBackColor = true;
            this.buttonCancel.Click += new System.EventHandler(this.buttonCancel_Click);
            // 
            // buttonOK
            // 
            this.buttonOK.ForeColor = System.Drawing.SystemColors.WindowText;
            this.buttonOK.Location = new System.Drawing.Point(132, 90);
            this.buttonOK.Name = "buttonOK";
            this.buttonOK.Size = new System.Drawing.Size(75, 23);
            this.buttonOK.TabIndex = 2;
            this.buttonOK.Text = "OK";
            this.buttonOK.UseVisualStyleBackColor = true;
            this.buttonOK.Click += new System.EventHandler(this.buttonOK_Click);
            // 
            // editDevice
            // 
            this.AcceptButton = this.buttonOK;
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.CancelButton = this.buttonCancel;
            this.ClientSize = new System.Drawing.Size(219, 126);
            this.Controls.Add(this.buttonOK);
            this.Controls.Add(this.buttonCancel);
            this.Controls.Add(this.comboBoxConnection);
            this.Controls.Add(this.comboBoxType);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.MaximumSize = new System.Drawing.Size(235, 165);
            this.MinimumSize = new System.Drawing.Size(235, 165);
            this.Name = "editDevice";
            this.Text = "editDevice";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox comboBoxType;
        private System.Windows.Forms.ComboBox comboBoxConnection;
        private System.Windows.Forms.Button buttonCancel;
        private System.Windows.Forms.Button buttonOK;
    }
}